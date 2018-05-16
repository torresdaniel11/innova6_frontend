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
  changeDateFormat;
  public length_conversation;
  constructor(private admin: AdminService) {
    this.conversations = [];
    this.selectedConversations = [];
    this.setDate = [];
    this.td_hour = false;
    // ===================================================================================================
    // ===================================================================================================
    // Cambia el formato de la fecha que trae los datos de conversations
    this.changeDateFormat = function(date_format, date_type){
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
      if ( date_type === 'Fecha' ) {
        newDateFormat = year + '/' + setZero(month) + '/' + setZero(dt) + '-' + setHour(hour) + ':' + setZero(min);
      }
      return newDateFormat;
    };
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
          for ( let con = 0; con < Object.keys(this.conversations).length; con++ ) {
            this.admin.recuperarConversacion(this.conversations[con].conversation_token).subscribe(
              data => {
                if (data !== undefined) {
                  for ( let qs = 0; qs < Object.keys(data).length; qs++ ) {
                    // ==================================================================================================
                    // ==================================================================================================
                    // Coversion del formato de la fecha
                    let start_conversation = +new Date(data[qs].question_record_conversation.conversation_create_date);
                    let end_conversation = +new Date(data[qs].question_record_conversation.conversation_update_date);
                    let conversation_operation = end_conversation - start_conversation;
                    if (conversation_operation > 60e3) {
                      this.conversations[con].conversation_duration = Math.floor(conversation_operation / 60e3);
                    } else {
                      this.conversations[con].conversation_duration = Math.floor(conversation_operation / 1e3);
                    }
                    let date = data[qs].question_record_conversation.conversation_create_date;
                    this.conversations[con].conversation_date = this.changeDateFormat(  date, 'Fecha' );
                    // ==================================================================================================
                    // ==================================================================================================
                    // Asignacion de las respuestas a las preguntas de evaluacion
                    // if (data[qs].question_record_conversation.conversation_conversation_level.conversation_level_name === 'Finalización') {
                      if (data[qs].question_record_question.question_conversation_level.conversation_level_name === 'Pregunta 1.') {
                        let reponse_value = data[qs].question_record_response;
                        if (reponse_value === 'Si' || reponse_value === 'si' || reponse_value === 'no!') {
                          this.conversations[con].eval_chatbot_response1 = data[qs].question_record_response;
                        }
                      }
                      if (data[qs].question_record_question.question_conversation_level.conversation_level_name === 'Pregunta 2.') {
                        if (parseInt(data[qs].question_record_response, 10) < 6) {
                          this.conversations[con].eval_chatbot_response2 = data[qs].question_record_response;
                        }
                      }
                    // }
                  }
                }
              }
            )
          }
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
      { field: 'conversation_email',        header: 'Nombre',                                   width: '15%' },
      { field: 'conversation_date',         header: 'Fecha',                                    width: '13%' },
      { field: 'conversation_duration',     header: 'Duración (min)',                           width: '10%' },
      { field: 'eval_chatbot_response1',    header: '¿El chatbot le fué fácil de usar?',        width: '20%' },
      { field: 'eval_chatbot_response2',    header: '¿Le fué útil las respuestas entregadas?',  width: '25%' },
      { field: 'conversation_token',        header: 'Consultas',                                width: '9%' }
    ];
  }

}
