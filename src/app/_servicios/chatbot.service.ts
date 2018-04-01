import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatbotService {
  abierto: boolean;
  @Output() estadoChat: EventEmitter<any> = new EventEmitter();

  constructor(public http: HttpClient) {
    this.abierto = false;
  }

  toggleChat() {
    this.setEstadoChat(!this.abierto)
  }

  setEstadoChat(estado: boolean) {
    this.abierto = estado;
    this.estadoChat.emit(this.abierto);
  }


  crearConversacion() {
    let param = JSON.stringify({});
    let uri = 'http://innova6.herokuapp.com/conversations/'
    let headers = new HttpHeaders().set('Content-Type', 'Application/json');
    this.http.post(uri, param, { headers: headers, responseType: 'json' })
      .subscribe(result => {
        console.log(result)
      },
      error => {
        console.log(<any>error);
      });
    //end http post
  }

  recuperarConversacion(token: string) {
    let uri = 'http://innova6.herokuapp.com/conversations/' + token;
    this.http.get(uri)
      .subscribe(result => {
        console.log(result)
      }, error => {
        console.log(<any>error);
      });
    //end http get
  }


}
