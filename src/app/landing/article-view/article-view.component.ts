import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AdminService} from '../../_servicios/admin.service';
declare var $: any;

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleViewComponent implements OnInit {
  conversations;
  categories;
  constructor(private landing: AdminService) {
    this.categories = '';
    this.conversations = [];
  }
  ngOnInit() {
    const url = window.location.href;
    const splitUrl = url.split('/');
    const article_id = splitUrl[(splitUrl.length - 1)];

    this.landing.articlesId(article_id).subscribe(
      result => {
        if (result !== undefined) {
          this.conversations = result;
          this.landing.categories().subscribe(
            data => {
              if ( data !== undefined ) {
                for ( let r = 0; r < Object.keys(data).length; r++) {
                  if ( data[r].id === this.conversations.question_category ) {
                    this.categories = data[r].category_name;
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
