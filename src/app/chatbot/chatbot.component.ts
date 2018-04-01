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

  currentConversacion;
  crearConversacion(){
    this.chatbot.crearConversacion().subscribe(result => {
      console.log(result);
      if(result['conversation_token']!=undefined){
        localStorage.setItem('conversation_token', result['conversation_token']);
        //siguiente pregunta
        this.siguientePregunta()
      }
    }, error => {
      console.log(<any>error);
    });
  }

  recuperarConversacion(){
    this.chatbot.recuperarConversacion(this.conversation_token).subscribe(
      result => {
        console.log(result)
        if(result['conversation_token']!=undefined){
          //siguiente pregunta
          this.siguientePregunta()
        } else {
        //CREAR UNA CONVERSACION ?
      }
      }, error => {
        //CREAR CONVERSACION ??
        console.log(<any>error);
      }
    );
  }

  siguientePregunta(){
    this.chatbot.consultarPreguntaARealizar(this.conversation_token).subscribe(
      result=>{
        console.log(result)
      }
    )
  }



  cerrarChat() {
    this.chatbot.setEstadoChat(false);
  }

  abrirChat() {
    this.chatbot.setEstadoChat(true);
  }

}
