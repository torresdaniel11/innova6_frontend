import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../_servicios/admin.service';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectWindow: boolean;
  windowClose: boolean;
  conversations;
  // =====================================================
  // Variables del pie si - no
  doughnutChartLabels1;
  doughnutChartData1;
  doughnutChartType1;
  // =====================================================
  // variables del pie util 1 - 5
  doughnutChartLabels2;
  doughnutChartData2;
  doughnutChartType2;
  chargedData: boolean;
  // =====================================================
  // variables del delay del chatbot
  disabledEdit: boolean;
  disabledSave: boolean;
  saveChatbotDelay;
  hideDelayAlert: boolean;
  constructor(private admin: AdminService) {
    this.selectWindow = true;
    this.windowClose = true;
    this.conversations = [];
    this.doughnutChartData1 = [0,0];
    this.doughnutChartLabels1 = [];
    this.doughnutChartType1 = '';
    this.doughnutChartData2 = [0, 0, 0, 0, 0];
    this.doughnutChartLabels2 = [];
    this.doughnutChartType2 = '';
    this.chargedData = false;
    this.disabledEdit = false;
    this.disabledSave = true;
    this.saveChatbotDelay = '';
    this.hideDelayAlert = false;
  }
  // ==============================================================================
  // ==============================================================================
  // Hide windows event
  public hideWindow() {
    this.selectWindow = !this.selectWindow;
  }
  public closeWindow() {
    this.windowClose = !this.windowClose;
  }
  public editChatbotDelay() {
    this.disabledEdit = true;
    this.disabledSave = false;
  }
  public closeDelayAlert() {
    this.hideDelayAlert = false;
  }
  ngOnInit() {
    // ===================================================================================================
    // ===================================================================================================
    // Consume los servicios de conversation para mostrar en la tabla
    this.admin.conversations().subscribe(
      result => {
        if (result !== undefined) {
          this.conversations = result;
          for ( let con = 0; con < Object.keys(this.conversations).length; con++ ) {
            this.admin.recuperarConversacion(this.conversations[con].conversation_token).subscribe(
              data => {
                if (data !== undefined) {
                  for ( let qs = 0; qs < Object.keys(data).length; qs++ ) {
                    // if ( data[qs].question_record_conversation.conversation_conversation_level.conversation_level_name === 'Finalización') {
                      if ( data[qs].question_record_question.question_conversation_level.conversation_level_name === 'Pregunta 1.') {
                        if (data[qs].question_record_response === 'Si' || data[qs].question_record_response === 'si') {
                          const position1 = 0;
                          this.doughnutChartData1[position1]++;
                        }
                        if (data[qs].question_record_response === 'no!' || data[qs].question_record_response === 'no') {
                          const position1 = 1;
                          this.doughnutChartData1[position1]++;
                        }
                      }
                      if ( data[qs].question_record_question.question_conversation_level.conversation_level_name === 'Pregunta 2.') {
                        const response_value = parseInt(data[qs].question_record_response, 10);
                        if (response_value < 6) {
                          const position2 = response_value;
                          this.doughnutChartData2[( position2 - 1 )]++;
                        }
                      }
                    //}
                  }
                }
                if ( con === ( Object.keys(result).length - 1)) {
                  this.chargedData = true;
                  this.doughnutChartLabels1 = ['Si', 'No' ];
                  this.doughnutChartType1   = 'doughnut';
                  this.doughnutChartLabels2 = ['Nada útil', 'Poco útil', 'Útil', 'Ligeramente útil', 'Muy útil'];
                  this.doughnutChartType2   = 'doughnut';
                }
              }
            );
          }

        }else {}
      },
      error => {
        console.log(<any>error);
      }
    );
    // ===================================================================================================
    // ===================================================================================================
    // Consume los servicios del chatbot delay y lo muestra en el input
    this.admin.getChabotTimeDelay().subscribe(
      delayTime => {
        if (delayTime !== undefined) {
          $('#chatbot-delay').val(delayTime[0].timeout);
        }
      }, error => {
        console.log(<any>error);
      }
    );
    // ===================================================================================================
    // ===================================================================================================
    // Actualiza el valor del chatbot delay
    this.saveChatbotDelay = function() {
      const delayTime = {
        id: 1,
        timeout: $('#chatbot-delay').val() // document.getElementById('chatbot-delay').value
      };
      this.admin.addChabotTimeDelay(delayTime).subscribe(
        result => {
          const container_alert = $('#alert-delay-time'),
                message_alert = $('.alert-save-delay');
          if (result !== undefined) {
            container_alert.removeClass('alert-danger').addClass('alert-success').show();
            message_alert.html('').append(
              '<strong>Genial!</strong> Los cambios se gurdaron correctamente.'
            );
            this.disabledEdit = false;
            this.disabledSave = true;
            this.hideDelayAlert = true;
          } else {
            container_alert.removeClass('alert-successr').addClass('alert-dange').show();
            message_alert.html('').append(
              '<strong>Ups!</strong> Parece que algo no salio bien.'
            );
            this.hideDelayAlert = true;
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    };
  }

}
