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
  articles() {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'https://innova6.herokuapp.com/articles/';
    return this.http.get(uri);
    // end http get
  }
  articlesId(id: string) {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'https://innova6.herokuapp.com/articles/' + id + '/';
    return this.http.get(uri);
    // end http get
  }
  categories() {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'https://innova6.herokuapp.com/categories/';
    return this.http.get(uri);
    // end http get
  }
  articlesType() {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'https://innova6.herokuapp.com/type_articles/';
    return this.http.get(uri);
    // end http get
  }
  newArticles(json) {
    let param = JSON.stringify(json);
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'https://innova6.herokuapp.com/articles/';
    let headers = new HttpHeaders().set('Content-Type', 'Application/json');
    return this.http.post(uri, param, { headers: headers, responseType: 'json' });
  }
  editArticles(id: string, json) {
    let param = JSON.stringify(json);
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'https://innova6.herokuapp.com/articles/' + id + '/';
    let headers = new HttpHeaders().set('Content-Type', 'Application/json');
    return this.http.put(uri, param, { headers: headers, responseType: 'json' });
  }
  deleteArticles(id: string) {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    let uri = hackurl + 'https://innova6.herokuapp.com/articles/' + id + '/';
    return this.http.delete(uri);
  }
}
