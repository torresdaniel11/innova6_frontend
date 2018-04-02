import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-chatbot-question',
  templateUrl: './chatbot-question.component.html',
  styleUrls: ['./chatbot-question.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatbotQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let hackurl = 'https://cors-anywhere.herokuapp.com/';

    // ==========================================================================================
    // Get the id of question to show its content
    const url = window.location.href,
      split_url = url.split("/"),
      length_split_url = split_url.length,
      get_id_question = parseInt(split_url[(length_split_url - 1)]);
    // ==========================================================================================
    // Getting data information of question table
    $.getJSON(hackurl+"https://innova6.herokuapp.com/questions/", function(data) {
      const questions = data;
      for (var i = 0; i < questions.length; i++) {
        const parse_id_value = parseInt(questions[i].id);
        if (parse_id_value === get_id_question) {
          $('#pregunta').val(questions[i].question_description);
          $('#nombrePregunta').val(questions[i].question_name);
          $('#keywordsPregunta').val(questions[i].question_keywords);
          $('#btn-conversation-level').html("").append(
            "<span class='dropdown-level-name'>" + questions[i].question_conversation_level.conversation_level_name + "</span>" +
            "&nbsp;<i class='fa fa-chevron-down' aria-hidden='true'></i>"
          );
          $('#btn-conversation-category').html("").append(
            "<span class='dropdown-category-name'>" + questions[i].question_category.category_name + "</span>" +
            "&nbsp;<i class='fa fa-chevron-down' aria-hidden='true'></i>"
          );
        }
      }
      console.log(questions);
    }).fail(function() {
      return "Ups! something happen";
    });
    // ==========================================================================================
    // Getting data information of question table
    $.getJSON(hackurl+"https://innova6.herokuapp.com/categories/", function(data) {
      const categories = data;
      for (var i = 0; i < categories.length; i++) {
        $('.dropdown-categories').append(
          "<a href='#'>" + categories[i].category_name + "</a>"
        )
      }
    }).fail(function() {
      return "Ups! something happen";
    });
    // ==========================================================================================
    // Dropdown event config
    $('.dropbtn').on('click', function(e) {
      e.preventDefault();
      const get_dropdown = $(this).next();
      if (get_dropdown.css('display') == 'none') {
        get_dropdown.css('display', 'block');
      } else {
        get_dropdown.css('display', 'none');
      }

    })
    // ==========================================================================================
    // PUT Event Config
    $('#btn-question-send').on('click', function(e) {
      e.preventDefault();

      const qts_name = $('#nombrePregunta').val(),
        qts_description = $('#pregunta').val(),
        qts_keywords = $('#keywordsPregunta').val(),
        qts_level = $('.dropdown-level-name').html(),
        qts_category = $('.dropdown-category-name').html();

      $.ajax({
        type: 'PUT',
        url: hackurl+"https://innova6.herokuapp.com/questions/" + get_id_question + "/",
        data: JSON.stringify({
          id: get_id_question,
          question_name: qts_name,
          question_description: qts_description,
          question_keywords: qts_keywords,
          question_conversation_level: {
            conversation_level_name: qts_level,
            conversation_color: "Blanco"
          },
          question_category: {
            category_name: qts_category
          }
        }),
        error: function(e) {
          console.log(e);
        },
        dataType: "json",
        contentType: "application/json",
        success: function() {
          $('.event-request-alert').html("").append(
            "<div class='alert alert-success alert-dismissible fade show' role='alert'>" +
            "Genial! Los datos se almacenaron correctamente" +
            "<button type='button' class='close btn-request-close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
            "</button>" +
            "</div>"
          );
        }
      });
      // ==========================================================================================
      // Close alert of request
      $('.event-request-alert').on('click', '.btn-request-close', function() {
        $(this).parent().hide();
      })

    })
  }

}
