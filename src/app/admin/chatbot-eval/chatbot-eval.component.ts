import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../_servicios/admin.service';
declare var $: any;

@Component({
  selector: 'app-chatbot-eval',
  templateUrl: './chatbot-eval.component.html',
  styleUrls: ['./chatbot-eval.component.css'],
})
export class ChatbotEvalComponent implements OnInit {
  // =================================================================
  // Variables para la tabla
  conversations;
  selectedConversations;
  cols: any[];
  // =================================================================
  // Variables para la función que le da formato a la fecha
  setDate;
  td_hour: boolean;
  public length_conversation;
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
    switch (date_type) {
      case 'Fecha':
        newDateFormat = year + '/' + setZero(month) + '/' + setZero(dt) + '-' + setHour(hour) + ':' + setZero(min);
        break;
      case 'Consultas':
        newDateFormat = '';
        break;
      default:
        newDateFormat = date_format;
    }
    return newDateFormat;
  };
  constructor(private admin: AdminService) {
    this.conversations = [];
    this.selectedConversations = [];
    this.setDate = [];
    this.td_hour = false;
  }
  ngOnInit() {
    // ===================================================================================================
    // ===================================================================================================
    // Consume los servicios de conversation para mostrar en la tabla
    this.admin.conversations().subscribe(
      result => {
        if (result !== undefined) {
          this.conversations = result;
          this.length_conversation = Object.keys(result).length;
        }else {}
      },
      error => {
        console.log(<any>error);
      }
    );
    // ===================================================================================================
    // ===================================================================================================
    // Objeto que controla los datos a mostrar en la tabla
    this.cols = [
      { field: 'id',                        header: 'ID',                                       width: '8%' },
      { field: 'conversation_name',         header: 'Nombre',                                   width: '15%' },
      { field: 'conversation_create_date',  header: 'Fecha',                                    width: '15%' },
      { field: '',                          header: 'Duración',                                 width: '8%' },
      { field: '',                          header: '¿El chatbot le fué fácil de usar?',        width: '20%' },
      { field: '',                          header: '¿Le fué útil las respuestas entregadas?',  width: '25%' },
      { field: 'conversation_token',        header: 'Consultas',                                width: '9%' }
    ];
  }

}
