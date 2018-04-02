import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../_servicios/chatbot.service'
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

  constructor(private chatbot: ChatbotService) {
    this.estaAbierto = chatbot.abierto;
    this.conversation_token = sessionStorage.getItem('conversation_token')
    this.input = "";
    this.mensajes = [];
  }

  ngOnInit() {
    this.chatbot.estadoChat.subscribe(estado => {
      this.estaAbierto = estado;
    });
    console.log(this.conversation_token)
    if (this.conversation_token === undefined || this.conversation_token === null || this.conversation_token === "null") {
      //NO HAY CONVERSACION VAMOS A CREAR UNA
      console.log("crear");
      this.crearConversacion();
    } else {
      console.log("recuperar")
      // HAY UNA CONVERSACION VAMOS A VER SI EXISTE EN EL BACK
      this.recuperarConversacion();
    }
  }

  crearConversacion() {
    this.chatbot.crearConversacion().subscribe(result => {
      console.log(result);
      if (result['conversation_token'] != undefined) {
        this.currentConversacion = result;
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
    console.log(this.currentConversacion)
    console.log(this.conversation_token)
    this.chatbot.consultarPreguntaARealizar(this.conversation_token).subscribe(
      result => {
        console.log(result);
        this.currentPregunta = result;
        console.log(result['question_description']);
        this.pushMensaje('chatbot',result['question_description'] )
      }, error => {
        console.log(<any>error);
        console.log(error.error)
      }
    );
  }

  enviar() {
    console.log(this.input);
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
    console.log(JSON.stringify(nuevoJson))
    this.chatbot.enviarRespuesta(this.conversation_token, nuevoJson).subscribe(result => {
      this.siguientePregunta();
    }, error => {
      console.log(<any>error);
      this.siguientePregunta();
    });
  }

  pushMensaje(de:string, mensaje:string){
    this.mensajes.push({
      "de": de,
      "mensaje": mensaje
    });
    this.scrollBottom();
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

  scrollBottom(){
    setTimeout(function() { $("#chat_body").scrollTop($("#chat_body")[0].scrollHeight); }, 10)
  }

}
