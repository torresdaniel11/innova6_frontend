import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../_servicios/admin.service';
import {element} from 'protractor';
import index from '@angular/cli/lib/cli';
declare var $: any;

@Component({
  selector: 'app-chatbot-eval',
  templateUrl: './chatbot-eval.component.html',
  styleUrls: ['./chatbot-eval.component.css']
})
export class ChatbotEvalComponent implements OnInit {

  conversations;
  setDate;
  td_hour: boolean;
  ev;
  private globalFlag = -1;

  constructor(private admin: AdminService) {
    this.conversations = [];
    this.setDate = [];
    this.td_hour = false;
  }

  ngOnInit() {
    this.admin.conversations().subscribe(
      result => {
        if (result !== undefined) {
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
          for (let i = 0; i < Object.keys(result).length; i++) {
            if (result[i].conversation_create_date !== undefined ) {
              const date  = new Date(result[i].conversation_create_date),
                    year  = date.getFullYear(),
                    month = date.getMonth() + 1,
                    dt    = date.getDate(),
                    hour  = date.getHours() + 5,
                    min   = date.getMinutes();
              this.setDate.push(year + '-' + setZero(month) + '-' + setZero(dt) + ' - ' + setHour(hour) + ':' + setZero(min));
            }
          }
          this.conversations = result;
        }else {}
      },
      error => {
        console.log(<any>error);
      }
    );
    // ===================================================================================================
    // ===================================================================================================
    // Imprime la fecah despues de finalizar el ngFor
    this.ev = function(flag){
      if (flag !== this.globalFlag) {
        const td_element = Array.from(document.querySelectorAll('.eval-td-date'));
        td_element.forEach((element, index, Array) => {
          element.innerHTML = this.setDate[index];
        });
        this.globalFlag = flag;
      }
    };
  }

}
