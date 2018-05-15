import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChatbotService } from '../_servicios/chatbot.service';
import { RatingModule } from 'primeng/rating';
import { Router } from '@angular/router'
declare var $: any;


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent implements OnInit {
  estaAbierto: boolean;
  conversation_token: string;
  currentConversacion;
  currentPregunta;
  mensajes;
  input: string;
  verFrecuentes = false;
  inputEnable: boolean;
  ratingEnable: boolean;
  constructor(private chatbot: ChatbotService, private ref: ChangeDetectorRef, private router: Router) {
    this.ratingEnable = true;
    this.inputEnable = true;
    this.estaAbierto = chatbot.abierto;
    this.conversation_token = chatbot.conversation_token;
    this.input = "";
    this.mensajes = [];
    this.ref.markForCheck();
  }

  configuraciones;

  ngOnInit() {
    this.chatbot.estadoChat.subscribe(estado => {
      this.estaAbierto = estado;
    });
    if (this.conversation_token === undefined || this.conversation_token === null || this.conversation_token === "null") {
      //NO HAY CONVERSACION VAMOS A CREAR UNA
      this.crearConversacion();
    } else {
      // HAY UNA CONVERSACION VAMOS A VER SI EXISTE EN EL BACK
      this.recuperarConversacion();
    }
    this.chatbot.getConfiguracionesChatbot().subscribe(result => {
      this.configuraciones = result[0];
      this.restartTimeout();
    })
    // this.printCategorias();
  }

  timeout;
  restartTimeout() {
    clearTimeout(this.timeout);
    if (this.configuraciones == undefined) return;
    let timeoutMilliseconds = parseInt(this.configuraciones.timeout);
    this.timeout = setTimeout(() => { this.finalizaChatbotTimeout() }, timeoutMilliseconds);
  }

  finalizaChatbotTimeout() {
    this.pushMensaje('chatbot', "Se finaliza chatbot por inactividad");
    this.inputEnable = false;
    this.cerrarChat();
  }

  crearConversacion() {
    this.chatbot.crearConversacion().subscribe(result => {
      if (result['conversation_token'] != undefined) {
        this.currentConversacion = result;
        this.conversation_token = result['conversation_token'];
        sessionStorage.setItem('conversation_token', result['conversation_token']);
        //siguiente pregunta
        this.siguientePregunta()
      }
    }, error => {
      console.log(<any>error);
    });
  }

  recuperarConversacion() {
    this.chatbot.recuperarConversacion(this.conversation_token).subscribe(
      result => {
        if (result['conversation_token'] != undefined) {
          //siguiente pregunta
          this.currentConversacion = result;
          this.siguientePregunta()
        } else {
          this.crearConversacion();
        }
      }, error => {
        this.crearConversacion();
        console.log(<any>error);
      }
    );
  }

  siguientePregunta() {
    if (this.conversation_token == null || this.conversation_token == undefined) {
      console.log("pere tantico")
    } else {
      this.restartTimeout();
      this.chatbot.consultarPreguntaARealizar(this.conversation_token).subscribe(
        result => {
          this.currentPregunta = result;
          var pregunta = this.currentConversacion.conversation_name == "" ? result['question_description'] : this.currentConversacion.conversation_name + ", " + result['question_description'];
          if (result['question_replace']) {
            // CATEGORIAS
            this.arrayCategorias().then(methodResult => {
              this.pushMensajeConOpciones('chatbot', pregunta, methodResult);
            }).catch(error => {
              console.log(error);
            });
          } else if (result['question_platform']) {
            //PLATAFORMA
            let plataformas = ["Moodle", "Sicua"]
            this.pushMensajeConOpciones('chatbot', pregunta, plataformas);
          } else if (result['question_load_question']) {
            // PREGUNTAS FRECUENTES
            this.arrayPreguntasFrecuentes().then(methodResult => {
              this.pushMensajeConPreguntas('chatbot', pregunta, methodResult);
            }).catch(error => {
              console.log(error);
            });
          } else if (result['question_load_article']) {
            //RECURSO
            this.arrayRecursos().then(methodResult => {
              this.pushMensajeRecursos('chatbot', pregunta, methodResult);
            }).catch(error => {
              console.log(error);
            })
          } else if (result['question_evaluate_one']) {
            //EVALUACION SI O NO
            this.pushMensajeCalificacion('chatbot', pregunta, 'si-no')
          } else if (result['question_evaluate_two']) {
            //EVALUACION RATING
            this.pushMensajeCalificacion('chatbot', pregunta, '1-5')
          } else if (result['question_finish']) {
            //FIN CONVERSACION
            this.pushMensaje('chatbot', pregunta)
            this.inputEnable = false;
          } else {
            //PREGUNTA SENCILLA
            this.pushMensaje('chatbot', pregunta)
          }
        }, error => {
          console.log(error.error)
        }
      );
    }
  }

  enviar() {
    if (this.input.length) {
      this.enviarRespuesta(this.input);
      this.input = "";
    } else {
      console.log("mensaje vacio");
    }
  }

  set(opcion: string) {
    this.input = opcion;
    this.enviar();
  }

  //level 5 categorias
  enviarRespuesta(userInput) {
    this.pushMensaje('usuario', userInput)
    let nuevoJson = {};
    nuevoJson['question_record_response'] = userInput;
    nuevoJson['question_record_conversation'] = this.currentConversacion;
    nuevoJson['question_record_question'] = this.currentPregunta;
    this.chatbot.enviarRespuesta(this.conversation_token, nuevoJson).subscribe(result => {
      this.currentConversacion = result;
      this.siguientePregunta();
    }, error => {
      console.log(<any>error);
      this.siguientePregunta();
    });
  }

  // printCategorias() {
  //   return new Promise((resolve, reject) => {
  //     var result_string: string = "";
  //     this.chatbot.getCategorias().subscribe(result => {
  //       for (var i = 0; i < Object.keys(result).length; i++) {
  //         let cat = result[i].category_name;
  //         result_string += "<span class='hola'>" + cat + "</span>";
  //       }
  //       resolve(result_string);
  //     }, error => {
  //       console.log(<any>error);
  //       reject(error.error);
  //     })
  //   })
  // }

  arrayCategorias() {
    return new Promise((resolve, reject) => {
      var result_array = [];
      this.chatbot.getCategorias().subscribe(result => {
        for (var i = 0; i < Object.keys(result).length; i++) {
          let cat = result[i].category_name;
          result_array.push(cat);
        }
        resolve(result_array);
      }, error => {
        console.log(<any>error);
        reject(error.error);
      })
    })
  }

  arrayPreguntasFrecuentes() {
    return new Promise((resolve, reject) => {
      var result_array = [];
      this.chatbot.getPreguntasFrecuentes(this.conversation_token).subscribe(result => {
        for (var i = 0; i < Object.keys(result).length; i++) {
          let pf = result[i].frequent_questions_name;
          result_array.push(pf);
        }
        resolve(result_array);
      }, error => {
        console.log(<any>error);
        reject(error.error);
      })
    })
  }

  arrayRecursos() {
    return new Promise((resolve, reject) => {
      var result_array = [];
      this.chatbot.getRecursos(this.conversation_token).subscribe(result => {
        for (var i = 0; i < Object.keys(result).length; i++) {
          let recurso = result[i];
          result_array.push(recurso);
        }
        resolve(result_array);
      }, error => {
        console.log(<any>error);
        reject(error.error);
      })
    })
  }

  navegarRecurso(tipo, url, nombre) {
    this.set("Quiero ver: " + nombre);
    if (tipo == "INTERNO") {
      this.router.navigate([url]);
    } else if (tipo == "PDF" || tipo == "YOUTUBE" || tipo == "PAGE_WEB") {
      this.router.navigate(['/recurso'], { queryParams: { url: url, tipo: tipo } });
    } else {
      console.log("unkown")
    }
  }

  pushMensaje(de: string, mensaje: string) {
    this.mensajes.push({
      "de": de,
      "mensaje": mensaje
    });
    this.scrollBottom();
  }

  pushMensajeConOpciones(de: string, mensaje: string, opciones) {
    this.mensajes.push({
      "de": de,
      "mensaje": mensaje,
      "opciones": opciones
    });
    this.scrollBottom();
  }

  pushMensajeConPreguntas(de: string, mensaje: string, preguntas) {
    this.mensajes.push({
      "de": de,
      "mensaje": mensaje,
      "preguntas": preguntas
    });
    this.scrollBottom();
  }

  pushMensajeCalificacion(de: string, mensaje: string, tipo_calificacion: string) {
    this.mensajes.push({
      "de": de,
      "mensaje": mensaje,
      "tipo_poll": tipo_calificacion
    });
    this.scrollBottom();
  }

  pushMensajeRecursos(de: string, mensaje: string, recursos) {
    this.mensajes.push({
      "de": de,
      "mensaje": mensaje,
      "recursos": recursos
    });
    this.scrollBottom();
  }


  marcarCalificacion(event) {
    this.set(event.value + "")
    this.ratingEnable = false;
  }

  onKey(event) {
    if (event.keyCode == 13) {
      this.enviar();
    }
  }

  cerrarChat() {
    this.chatbot.setEstadoChat(false);
  }

  abrirChat() {
    this.chatbot.setEstadoChat(true);
    this.scrollBottom();
  }

  scrollBottom() {
    setTimeout(function() { $("#chat_body").scrollTop($("#chat_body")[0].scrollHeight); }, 10)
  }


}
