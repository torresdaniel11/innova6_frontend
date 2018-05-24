import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import {AdminService} from '../../_servicios/admin.service';
import {ConfirmationService} from 'primeng/api';
declare var $:any;

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeComponent implements OnInit {
  cols: any[];
  questions;
  msgs;
  constructor(private admin: AdminService, private confirmationService: ConfirmationService) {
    this.questions = [];
    this.msgs = [];
  }
  // ===================================================================================================
  // ===================================================================================================
  // Evento para borrar articulos
  confirm(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    console.log(idAttr);
    this.confirmationService.confirm({
      message: '¿Confirmas la eliminación del artículo?',
      header: 'Confirmación de eliminación',
      icon: 'fa fa-trash',
      accept: () => {
        this.admin.deleteQuestions(value).subscribe(
          result => {
            this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Artículo barrado'}];
            console.log(result);
            window.location.reload();
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
    this.admin.getQuestions().subscribe(
      result => {
        if (result !== undefined) {
          this.questions = result;
        }
      }, error => {
        console.log(<any>error);
      }
    );
    $('#tree-questions').on('click', 'button', function () {
      const button_id = $(this).attr('id');
      window.location.href = 'admin/chatbot/' + button_id;
    });
    this.cols = [
      { field: 'id', header: 'ID', width: '5%' },
      { field: 'question_description', header: 'Descripción', width: '75%' },
      { field: 'id', header: 'Editar', width: '20%'}
    ];
  }
}
