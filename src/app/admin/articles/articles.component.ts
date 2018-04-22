///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../_servicios/admin.service';
import {ConfirmationService} from 'primeng/api';
declare var $: any;


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  // =================================================================
  // Variables para la tabla
  displayDialog: boolean;
  cols: any[];
  selectedArticle;
  artl;
  delete;
  // =================================================================
  // Variables para consumir los servicios
  articles;
  categories;
  msgs;
  constructor( private admin: AdminService, private confirmationService: ConfirmationService) {
    this.articles = [];
    this.artl = this.articles;
    this.categories = [];
    this.msgs = [];
    this.selectedArticle = [];
    // ===================================================================================================
    // ===================================================================================================
    // Evento para borrar de la tabla el articulo borrado
    this.delete = function() {
      let index = this.articles.indexOf(this.selectedArticle);
      this.articles = this.articles.filter((val, i) => i != index);
      this.artl = null;
      this.displayDialog = false;
    };
  }
  onRowSelect(event) {
    $(".btn-delete").prop('disabled', true);
    $("#"+event.data.id).prop('disabled', false);
    console.log(event.data);
  }
  // ===================================================================================================
  // ===================================================================================================
  // Cambia el formato de la fecha que trae los datos de conversations
  changeDateFormat = function(date_format, date_type){
    const setZero = function(value) {
      if (value < 10) {
        value = '0' + value;
        return value;
      } else {
        return value;
      }
    };
    const  setHour = function (hour){
      let modify_hour = hour;
      if (hour > 24) {
        modify_hour -= 24;
        modify_hour = setZero(modify_hour);
        return modify_hour;
      } else {
        return modify_hour;
      }
    };
    const date  = new Date(date_format),
      year  = date.getFullYear(),
      month = date.getMonth() + 1,
      dt    = date.getDate(),
      hour  = date.getHours() + 5,
      min   = date.getMinutes();
    let newDateFormat = '';
    if (date_type === 'Fecha de creación') {
      newDateFormat = year + '/' + setZero(month) + '/' + setZero(dt) + '-' + setHour(hour) + ':' + setZero(min);
    } else {
      newDateFormat = date_format;
    }
    return newDateFormat;
  };
  // ===================================================================================================
  // ===================================================================================================
  // Evento para borrar articulos
  confirm(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    this.confirmationService.confirm({
      message: '¿Confirmas la eliminación del artículo?',
      header: 'Confirmación de eliminación',
      icon: 'fa fa-trash',
      accept: () => {
        this.admin.deleteArticles(value).subscribe(
          result => {
            this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Artículo barrado'}];
            this.delete();
            console.log(result);
          }, error => {
            console.log(<any>error);
          }
        );
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'Eliminación cancelada'}];
      }
    });
  }
  ngOnInit() {
    // ===================================================================================================
    // ===================================================================================================
    // Consume los servicios de articulos para mostrar en la tabla
    this.admin.articles().subscribe(
      data => {
        if ( data !== undefined) {
          this.articles = data;
          this.admin.categories().subscribe(
            result => {
              if (result !== undefined) {
                this.categories = result;
                for (let i = 0; i < Object.keys(this.articles).length; i++) {
                  for (let c = 0; c < Object.keys(this.categories).length; c++) {
                    if (this.articles[i].question_category === this.categories[c].id) {
                      this.articles[i].name_category = this.categories[c].category_name;
                    }
                  }
                }
              } else {}
            }
          );
        } else {}
      }
    );
    // ===================================================================================================
    // ===================================================================================================
    // Objeto que controla los datos a mostrar en la tabla
    this.cols = [
      { field: 'id',                  header: 'ID',                 width: '7%' },
      { field: 'article_tittle',      header: 'Título',             width: '33%' },
      { field: 'article_create_date', header: 'Fecha de creación',  width: '15%' },
      { field: 'name_category',       header: 'Categoría',          width: '20%' },
      { field: 'id',                  header: 'Acción',             width: '20%' }
    ];
  }

}
