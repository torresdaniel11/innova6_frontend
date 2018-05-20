import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubePlayerModule } from 'ngx-youtube-player';
@Component({
  selector: 'app-recurso-externo',
  templateUrl: './recurso-externo.component.html',
  styleUrls: ['./recurso-externo.component.css']
})
export class RecursoExternoComponent implements OnInit {
  url;
  tipo;
  pdfUrl;
  private id: string = '';

  constructor(private route: ActivatedRoute,public sanitizer: DomSanitizer) {
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      this.tipo = params['tipo'];
      this.getUrlCorrecta()
    });
  }

  ngOnInit() {
  }

  getUrlCorrecta(){
    console.log(this.tipo)
    if(this.tipo == "YOUTUBE"){
      this.id = this.url.split("?v=")[1];
    } else if( this.tipo == "PDF"){
      this.pdfUrl = "http://docs.google.com/gview?url=" + this.url + "&embedded=true"
    }
  }


}
