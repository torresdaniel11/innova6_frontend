import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../_servicios/admin.service';
declare var $: any;

@Component({
  selector: 'app-chatbot-eval-conversation',
  templateUrl: './chatbot-eval-conversation.component.html',
  styleUrls: ['./chatbot-eval-conversation.component.css']
})
export class ChatbotEvalConversationComponent implements OnInit {
  // Variable para el servicio
  conversations;
  // =================================================================
  // Variables para la tabla
  selectedConversations;
  cols: any[];

  constructor(private admin: AdminService) {
    this.conversations = [];
  }

  ngOnInit() {
    // ===================================================================================================
    // ===================================================================================================
    // Consume los servicios de conversation para mostrar en la tabla
    const url = window.location.href;
    const splitUrl = url.split('%3F');
    const token = splitUrl[1];
    this.admin.recuperarConversacion(token).subscribe(
      result => {
        if (result !== undefined) {
          this.conversations = result;
          for (let i = 0; i < Object.keys(this.conversations).length; i++){
            this.conversations[i].short_answer = result[i].question_record_question.question_description;
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
      { field: 'short_answer',              header: 'Pregunta',  width: '50%' },
      { field: 'question_record_response',  header: 'Respuesta', width: '50%' }
    ];
  }
}
