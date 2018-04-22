import { ViewEncapsulation, Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';
    $.getJSON(hackurl+"https://innova6.herokuapp.com/questions/", function (data) {
      var questions = data;

      for( var i=0; i< questions.length; i++){
        $("#tree-questions").append(
          "<li class='list-group-item'>" +
          "<div class='row'>"+
          "<div class='col-md-8'>" +
          "<span class='tree-question-tittle'>" + questions[i].question_description +"</span>" +
          "</div>" +
          "<div class='col-md-4 tree-events-questions'>" +
          "<span class='tree-question-edit'>" +
          "<button id='"+ questions[i].id +"' type='button' class='btn btn-primary btn-sm'>" +
          "<i class='fa fa-pencil' aria-hidden='true'></i>" +
          "Editar" +
          "</button>" +
          "</span>" +
          "<span class='tree-question-edit'>" +
          "</span>" +
          "</div>" +
          "</div>" +
          "</li>"
        );
      }

      //console.log(questions)
    }).fail(function () {
      return "Ups! something happen";
    });

    $("#tree-questions").on("click", "button", function () {
      var button_id = $(this).attr("id");
      window.location.href = 'admin/chatbot/'+button_id;
    })

  }

}

/*
* $("#tree-questions").append(
          "<li class='list-group-item'>" +
          "<div class='row'>"+
          "<div class='col-md-8'>" +
          "<span class='tree-question-tittle'>" + questions[i].question_description +"</span>" +
          "</div>" +
          "<div class='col-md-4 tree-events-questions'>" +
          "<span class='tree-question-date'>31-03-2018</span>" +
          "<span class='tree-question-edit'>" +
          "<button id='"+ questions[i].id +"' type='button' class='btn btn-primary btn-sm'>" +
          "<i class='fa fa-pencil' aria-hidden='true'></i>" +
          "Editar" +
          "</button>" +
          "</span>" +
          "<span class='tree-question-edit'>" +
          "<button  type='button' class='btn btn-danger btn-sm'>" +
          "<i class='fa fa-times' aria-hidden='true'></i>" +
          "Eliminar" +
          "</button>" +
          "</span>" +
          "</div>" +
          "</div>" +
          "</li>"
        );
        */
