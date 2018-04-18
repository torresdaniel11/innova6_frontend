import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AdminService {
  constructor(public http: HttpClient) { }

  conversations() {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'http://innova6.herokuapp.com/conversations/';
    return this.http.get(uri);
    // end http get
  }
  recuperarConversacion(token: string) {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'https://innova6.herokuapp.com/question_records/' + token + '/';
    return this.http.get(uri);
  }
}
