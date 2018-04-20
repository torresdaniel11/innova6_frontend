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
  categories;
  articles;
  article_content: string;
  article_tittle: string;
  article_category: string;
  new_data;
  constructor(private admin: AdminService, private router: Router ) {
    this.new_data = [];
    this.articles = [];
    this.categories = [];
    this.selectedCategories = this.categories;
  }
  // ===================================================================================================
  // ===================================================================================================
  // Consume los servicios de articulos para mostrar en la tabla
  enviar() {
    const url = window.location.href;
    const split_url = url.split('$_id');
    let crud_ctr = 1;
    let art_id_category;
    for (let ca = 0; ca < Object.keys(this.categories).length; ca++) {
      if ( this.categories[ca].category_name === $('#category-id').html() ) {
        art_id_category = this.categories[ca].id;
      }
    }
    this.new_data = {
      'id': split_url[1],
      'article_tittle': $('#articleTittle').val(),
      'article_content': $('#article-content').text(),
      'article_slug': $('#articleTittle').val(),
      'question_category': art_id_category
    };
    const  array_data = Object.values(this.new_data);
    for ( let a = 1; a < array_data.length; a++) {
      if ( array_data[a] === '' || array_data[a] === 'empty' || array_data[a] === 'new_articles' || array_data[a] === undefined ) {
        crud_ctr = 0;
      }
    }
    console.log(array_data, crud_ctr);
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
                  }
                  for (let c = 0; c < Object.keys(this.categories).length; c++) {
                    if (this.articles[i].question_category === this.categories[c].id && split_url[1] !== 'new_articles' ) {
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
