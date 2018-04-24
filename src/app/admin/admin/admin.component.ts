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
  ngOnInit() {
    // ===================================================================================================
    // ===================================================================================================
    // Consume los servicios de conversation para mostrar en la tabla
    let question1_count2 = 0;
    this.admin.conversations().subscribe(
      result => {
        if (result !== undefined) {
          this.conversations = result;
          for ( let con = 0; con < Object.keys(this.conversations).length; con++ ) {
            this.admin.recuperarConversacion(this.conversations[con].conversation_token).subscribe(
              data => {
                if (data !== undefined) {
                  for ( let qs = 0; qs < Object.keys(data).length; qs++ ) {
                    if ( data[qs].question_record_conversation.conversation_conversation_level.conversation_level_name === 'Finalización') {
                      if ( data[qs].question_record_question.question_conversation_level.conversation_level_name === 'Pregunta 1') {
                        let position = data[qs].question_record_response === "si" ? 0 : 1;
                        this.doughnutChartData1[position]++;
                      } else {
                        let position = parseInt(data[qs].question_record_response);
                        this.doughnutChartData2[( position - 1 )]++;
                      }
                    }
                  }
                }
                if ( con === ( Object.keys(result).length - 1)) {
                  this.chargedData = true;
                  this.doughnutChartLabels1 = ['No', 'Si' ];
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

  }

}
