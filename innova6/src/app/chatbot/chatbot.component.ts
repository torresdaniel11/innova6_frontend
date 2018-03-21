import { Component, OnInit } from '@angular/core';
import {ChatbotService} from '../_servicios/chatbot.service'
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  estaAbierto:boolean;
  constructor(private chatbot:ChatbotService) {
    this.estaAbierto = chatbot.abierto;
  }

  ngOnInit() {
    this.chatbot.estadoChat.subscribe(estado =>{
      this.estaAbierto = estado;
    })
  }

  cerrarChat(){
    this.chatbot.setEstadoChat(false);
  }
  abrirChat(){
    this.chatbot.setEstadoChat(true);
  }

}
