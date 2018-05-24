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
    const hackurl = 'https://cors-anywhere.herokuapp.com/';

    // ==========================================================================================
    // Get the id of question to show its content
    const url = window.location.href,
      split_url = url.split('/'),
      length_split_url = split_url.length,
      get_id_question = parseInt(split_url[(length_split_url - 1)]);
    // ==========================================================================================
    // Getting data information of question table
    $('#btn-conversation-level').html('').append(
      '<span class="dropdown-level-name">Seleccione un nivel de conversación</span>' +
      '&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i>'
    );
    $('#btn-conversation-category').html('').append(
      '<span class="dropdown-category-name">Seleccione una categoría</span>' +
      '&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i>'
    );
    $.getJSON(hackurl + 'https://innova6.herokuapp.com/questions/', function(data) {
      const questions = data;
      for (let i = 0; i < questions.length; i++) {
        const parse_id_value = parseInt(questions[i].id);
        if (parse_id_value === get_id_question) {
          $('#pregunta').val(questions[i].question_description);
          $('#nombrePregunta').val(questions[i].question_name);
          $('#keywordsPregunta').val(questions[i].question_keywords);
          $('#btn-conversation-level').html('').append(
            '<span class="dropdown-level-name">' + questions[i].question_conversation_level.conversation_level_name + '</span>' +
            '&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i>'
          );
          if (questions[i].question_category !== null) {
            $('#btn-conversation-category').html('').append(
              '<span class="dropdown-category-name">' + questions[i].question_category.category_name + '</span>' +
              '&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i>'
            );
          } else {
            $('#btn-conversation-category').html('').append(
              '<span class="dropdown-category-name">Seleccione una categoría</span>' +
              '&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i>'
            );
          }
        }
      }
    }).fail(function() {
      return 'Ups! something happen';
    });
    // ==========================================================================================
    // Getting data information of question table
    $.getJSON(hackurl + 'https://innova6.herokuapp.com/categories/', function(data) {
      for (let i = 0; i < data.length; i++) {
        $('.dropdown-categories').append(
          '<a href="#" class="dp-categories">' + data[i].category_name +
            '<span class="idCategorySelected" style="display: none;">' + data[i].id + '</span>' +
          '</a>'
        );
      }
    }).fail(function() {
      return 'Ups! something happen';
    });
    $.getJSON(hackurl + 'http://innova6.herokuapp.com/conversation_levels/', function (data) {
      for (let a = 0; a < data.length; a++) {
        $('#nv-conversartion').append(
          '<a href="#" class="nvConversation">' + data[a].conversation_level_name +
            '<span class="idLevel" style="display: none;">' + data[a].id + '</span>' +
            '<span class="colorLevel" style="display: none;">' + data[a].conversation_color + '</span>' +
          '</a>'
        );
      }
    }).fail(function() {
      return 'Ups! something happen';
    });
    const location =  window.location.href;
    const splitLocation = location.split('$');
    console.log(splitLocation[1]);
    if (splitLocation[1] === 'new_question') { $('.btn-update').hide(); $('.btn-create').show(); }
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
        url: hackurl + 'https://innova6.herokuapp.com/questions/' + get_id_question + '/',
        data: JSON.stringify({
          id: get_id_question,
          question_name: qts_name,
          question_description: qts_description,
          question_keywords: qts_keywords,
          question_conversation_level: {
            conversation_level_name: qts_level,
            conversation_color: 'Blanco'
          },
          question_category: {
            category_name: qts_category
          }
        }),
        error: function(e) {
          console.log(e);
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
          $('.event-request-alert').html('').append(
            '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
            'Genial! Los datos se almacenaron correctamente' +
            '<button type="button" class="close btn-request-close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>'
          );
        }
      });
      // ==========================================================================================
      // Close alert of request
      $('.event-request-alert').on('click', '.btn-request-close', function() {
        $(this).parent().hide();
      });
    })
    // ==========================================================================================
    // Insert value selected in the nivel de conversacion dropdown
    $('#nv-conversartion').on('click', '.nvConversation', function (e) {
      e.preventDefault();
      $('#btn-conversation-level').html('').append(
        '<span class="dropdown-level-name">' + $(this).html() + '</span>' +
        '&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i>'
      );
      $('#nv-conversartion').css('display', 'none');
    });
    $('.dropdown-categories').on('click', '.dp-categories', function(e) {
      e.preventDefault();
      $('#btn-conversation-category').html('').append(
        '<span class="dropdown-category-name">' + $(this).html() + '</span>' +
        '&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i>'
      );
      $('.dropdown-categories').css('display', 'none');
    });
    // ==========================================================================================
    // POST Event Config
    $('.btn-create').on('click', function (e) {
      e.preventDefault();

      const qts_name        = $('#nombrePregunta').val(),
            qts_description = $('#pregunta').val(),
            qts_keywords    = $('#keywordsPregunta').val(),
            qts_level       = $('.dropdown-level-name').html(),
            gts_levelId     = $('.idLevel').html(),
            gts_levelColor  = $('.colorLevel').html(),
            qts_category    = $('.dropdown-category-name').html(),
            gts_categoryId  = $('.idCategorySelected').html();
      console.log(gts_levelColor, gts_levelId, gts_categoryId);

      $.ajax({
        type: 'POST',
        url: hackurl + 'https://innova6.herokuapp.com/questions/',
        data: JSON.stringify({
          'question_name': qts_name,
          'question_description': qts_description,
          'question_keywords': qts_keywords ,
          'question_conversation_level': {
            'id': gts_levelId,
            'conversation_level_name': qts_level,
            'conversation_color': gts_levelColor
          },
          'question_category': {
            'id': gts_categoryId,
            'category_name': qts_category
          },
          'question_replace': false,
          'question_update': false,
          'question_field_update': '',
          'question_load_question': false,
          'question_load_article': false,
          'question_evaluate_one': false,
          'question_evaluate_two': false,
          'question_platform': false,
          'question_finish': false,
          'question_type_user': false
        }),
        error: function(e) {
          console.log(e);
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
          $('.event-request-alert').html('').append(
            '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
            'Genial! La pregunta se agregó correctamete' +
            '<button type="button" class="close btn-request-close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>'
          );
        }
      });
    });
  }
}
