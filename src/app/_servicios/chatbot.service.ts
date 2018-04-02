import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatbotService {
  abierto: boolean;
  @Output() estadoChat: EventEmitter<any> = new EventEmitter();
  conversation_token: string;

  constructor(public http: HttpClient) {
    this.abierto = true;
    this.conversation_token = sessionStorage.getItem('conversation_token');
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
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'http://innova6.herokuapp.com/conversations/'
    let headers = new HttpHeaders().set('Content-Type', 'Application/json');
    return this.http.post(uri, param, { headers: headers, responseType: 'json' });
    //end http post
  }

  recuperarConversacion(token: string) {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'http://innova6.herokuapp.com/conversations/' + token;
    return this.http.get(uri);
    //end http get
  }

  consultarPreguntaARealizar(token) {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'https://innova6.herokuapp.com/conversations/' + token + '/questions/';
    return this.http.get(uri);
    //end http get
  }

  enviarRespuesta(token: string, json) {
    let param = JSON.stringify(json);
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'http://innova6.herokuapp.com/question_records/' + token + '/questions/';
    let headers = new HttpHeaders().set('Content-Type', 'Application/json');
    return this.http.post(uri, param, { headers: headers, responseType: 'json' });
  }

  getCategorias() {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'http://innova6.herokuapp.com/categories/';
    return this.http.get(uri);
  }


}
