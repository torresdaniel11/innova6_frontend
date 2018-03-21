import { Injectable, Output, EventEmitter  } from '@angular/core';

@Injectable()
export class ChatbotService {
  abierto:boolean;
  @Output() estadoChat: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.abierto = false;
  }

  toggleChat(){
    this.setEstadoChat(!this.abierto)
  }

  setEstadoChat(estado:boolean){
    this.abierto = estado;
    this.estadoChat.emit(this.abierto);
  }

}
