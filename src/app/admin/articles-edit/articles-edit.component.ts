import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AdminService} from '../../_servicios/admin.service';
import {empty} from 'rxjs/Observer';
declare var $: any;
@Component({
  selector: 'app-articles-edit',
  templateUrl: './articles-edit.component.html',
  styleUrls: ['./articles-edit.component.css']
})
export class ArticlesEditComponent implements OnInit {
  msgs;
  selectedCategories;
  selectedTypeArticles;
  categories;
  list_type_article;
  articles;
  article_content: string;
  article_tittle: string;
  article_category: string;
  new_data;
  article_url;
  type_article;
  changeTypeArticle(event) {
    this.type_article = event.value.type_article_name;
    console.log(event);
  }
  constructor(private admin: AdminService, private router: Router ) {
    this.new_data = {};
    this.articles = [];
    this.categories = [];
    this.selectedCategories = this.categories;
    this.list_type_article = [];
    this.selectedTypeArticles = this.list_type_article;
    this.article_url = '';
    this.type_article = '';
  }
  // ===================================================================================================
  // ===================================================================================================
  // Consume los servicios de articulos para mostrar en la tabla
  enviar() {
    const url = window.location.href;
    const split_url = url.split('$_id');
    let crud_ctr = 1;
    let art_id_category;
    let art_name_category;
    let id_type_art;
    for (let ca = 0; ca < Object.keys(this.categories).length; ca++) {
      if ( this.categories[ca].category_name === $('#category-id').html() ) {
        art_id_category = this.categories[ca].id;
        art_name_category = this.categories[ca].category_name;
      }
    }
    for (let tp = 0; tp < Object.keys(this.list_type_article).length; tp++) {
      console.log(this.list_type_article[tp].type_article_name,  $('#article-type-id').text());
      if ( this.list_type_article[tp].type_article_name ===  $('#article-type-id').text() ) {
        id_type_art = this.list_type_article[tp].id;
      }
    }
    const text_container = $('#article-content');
    this.new_data = {
      'id': split_url[1],
      'article_tittle': $('#articleTittle').val() !== undefined ? $('#articleTittle').val() : 'No aplica',
      'article_content': text_container.text() !== undefined && text_container.text() !== '' ? text_container.text() : 'No aplica',
      'article_slug': $('#articleTittle').val() !== undefined ? $('#articleTittle').val() : 'No aplica',
      'article_create_date': '2018-04-22T21:21:15.702075Z',
      'article_update_date': '2018-04-22T21:21:15.702075Z',
      'question_category': {
        'id': art_id_category,
        'category_name': art_name_category !== undefined ? art_name_category : 'No aplica'
      },
      'article_url': $('#articleLink').val() !== undefined ? $('#articleLink').val() : 'No aplica',
      'article_type_article': {
        'id': id_type_art,
        'type_article_name': $('#article-type-id').text() !== undefined ? $('#article-type-id').text() : 'No aplica'
      }
    };
    /*
    const  array_data = Object.values(this.new_data);
    for ( let a = 1; a < array_data.length; a++) {
      if ( array_data[a] === '' || array_data[a] === 'empty' || array_data[a] === 'new_articles' || array_data[a] === undefined ) {
        crud_ctr = 0;
      }
    }*/
    console.log(this.new_data, crud_ctr);
    if ( crud_ctr !== 0 ) {
      if (split_url[1] !== 'new_articles') {
        this.admin.editArticles(split_url[1], this.new_data).subscribe(
          result => {
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Artículo guardado,', detail: ' Sus datos fueron actualizados'});
            console.log(result);
          }, error => {
            console.log(<any>error);
          }
        );
      } else {
        this.admin.newArticles(this.new_data).subscribe(
          result => {
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Nuevo artículo,', detail: ' nuevo artículo creado con éxito'});
            setTimeout(() => {
              this.router.navigate(['/admin/articles']);
            }, 1000);
          }, error => {
            console.log(<any>error);
          }
        );
      }
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Ups!,', detail: ' parece que no has completado todos los campos'});
    }
  }
  ngOnInit() {
    this.admin.articlesType().subscribe(
      artType => {
        if ( artType !== undefined ) {
          this.list_type_article = artType;
        } else {}
      }
    );
    this.admin.categories().subscribe(
      result => {
        if (result !== undefined) {
          this.categories = result;
        } else {
        }
      }
    );
    // ===================================================================================================
    // ===================================================================================================
    // Consume los servicios de articulos para mostrar en la tabla
    this.admin.articles().subscribe(
      data => {
        if ( data !== undefined) {
          this.articles = data;
          const url = window.location.href;
          const split_url = url.split('$_id');
          this.admin.categories().subscribe(
            result => {
              if (result !== undefined) {
                this.categories = result;
                for (let i = 0; i < Object.keys(this.articles).length; i++) {
                  if (this.articles[i].id == split_url[1]) {
                    this.article_content = this.articles[i].article_content;
                    this.article_tittle = this.articles[i].article_tittle;
                    this.article_url = this.articles[i].article_url;
                    this.type_article = this.articles[i].article_type_article.type_article_name;
                  }
                  for (let c = 0; c < Object.keys(this.categories).length; c++) {
                    if (this.articles[i].question_category.id === this.categories[c].id && split_url[1] !== 'new_articles' ) {
                      this.article_category = this.categories[c].category_name;
                    }
                  }
                }
              } else {}
            }
          );
        } else {}
      }
    );
  }

}
