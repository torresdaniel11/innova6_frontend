import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../_servicios/chatbot.service'

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
  constructor(private chatbot: ChatbotService) {
    this.estaAbierto = chatbot.abierto;
    this.conversation_token = localStorage.getItem('conversation_token')
  }

  ngOnInit() {
    this.chatbot.estadoChat.subscribe(estado => {
      this.estaAbierto = estado;
    });
    console.log(this.conversation_token)
    if (this.conversation_token == undefined || this.conversation_token == null) {
      //NO HAY CONVERSACION VAMOS A CREAR UNA
      this.crearConversacion();
    } else {
      // HAY UNA CONVERSACION VAMOS A VER SI EXISTE EN EL BACK
      this.recuperarConversacion();
    }
  }


  crearConversacion() {
    this.chatbot.crearConversacion().subscribe(result => {
      console.log(result);
      if (result['conversation_token'] != undefined) {
        this.currentConversacion = result;
        localStorage.setItem('conversation_token', result['conversation_token']);
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
    this.chatbot.consultarPreguntaARealizar(this.conversation_token).subscribe(
      result => {
        console.log(result);
        this.currentPregunta = result;
      }
    );
  }
  //level 5 categorias
  enviarRespuesta(userInput) {
    let nuevoJson = {};
    nuevoJson['question_record_response'] = userInput;
    nuevoJson['question_record_conversation'] = this.currentConversacion;
    nuevoJson['question_record_question'] = this.currentPregunta;
    this.chatbot.enviarRespuesta(this.conversation_token, nuevoJson).subscribe(result => {
      console.log(result)
      this.siguientePregunta();
    });
  }

  cerrarChat() {
    this.chatbot.setEstadoChat(false);
  }

  abrirChat() {
    this.chatbot.setEstadoChat(true);
  }

}
