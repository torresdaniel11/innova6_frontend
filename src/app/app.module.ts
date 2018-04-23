import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { YoutubePlayerModule } from 'ng2-youtube-player';

import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// librerias externas
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';

// Graphics ng2-charts
import { ChartsModule } from 'ng2-charts';

// Datatable PRIMENG and others
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {EditorModule} from 'primeng/editor';
import {DropdownModule} from 'primeng/dropdown';

// Servicios
import { AuthService } from './_servicios/auth.service';
import { ChatbotService } from './_servicios/chatbot.service';
import { AdminService} from './_servicios/admin.service';

// layouts
import { LayoutComponent } from './_layout/layout/layout.component';
import { AdminLayoutComponent } from './_layout/admin-layout/admin-layout.component';

// ----- vistas -----
import { ChatbotComponent } from './chatbot/chatbot.component';

// --landing
import { HomeComponent } from './landing/home/home.component';
import { QuienesSomosComponent } from './landing/quienes-somos/quienes-somos.component';
import { EquipoGtiComponent } from './landing/equipo-gti/equipo-gti.component';
import { CatalogoComponent } from './landing/catalogo/catalogo.component';
import { ContectenosComponent } from './landing/contectenos/contectenos.component';
import { LoginComponent } from './landing/login/login.component';
import { ArticlesEditComponent } from './admin/articles-edit/articles-edit.component';
import { ArticleViewComponent } from './landing/article-view/article-view.component';

// --admin
import { AdminComponent } from './admin/admin/admin.component';
import { TreeComponent } from './admin/tree/tree.component';
import { ChatbotQuestionComponent } from './admin/chatbot-question/chatbot-question.component';
import { ChatbotEvalComponent } from './admin/chatbot-eval/chatbot-eval.component';
import { ChatbotEvalConversationComponent } from './admin/chatbot-eval-conversation/chatbot-eval-conversation.component';
import { ArticlesComponent } from './admin/articles/articles.component';
import { RecursoExternoComponent } from './recurso-externo/recurso-externo.component';


const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'index', component: HomeComponent },
      { path: 'quienes_somos', component: QuienesSomosComponent },
      { path: 'equipo_gti', component: EquipoGtiComponent },
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'contectenos', component: ContectenosComponent },
      { path: 'article/:id', component: ArticleViewComponent },
      { path: 'recurso', component: RecursoExternoComponent }
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '',
    component: AdminLayoutComponent ,
    children: [
      {path: 'admin', component: AdminComponent },
      {path: 'admin/chatbot', component: TreeComponent },
      {path: 'admin/chatbot/:id', component: ChatbotQuestionComponent },
      {path: 'admin/chatbot_eval', component: ChatbotEvalComponent },
      {path: 'admin/chatbot_eval/:id', component: ChatbotEvalConversationComponent },
      {path: 'admin/articles', component: ArticlesComponent },
      {path: 'admin/articles/:id', component: ArticlesEditComponent }
    ]
  },
  { path: '**', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuienesSomosComponent,
    EquipoGtiComponent,
    CatalogoComponent,
    ContectenosComponent,
    ChatbotComponent,
    LayoutComponent,
    AdminComponent,
    LoginComponent,
    TreeComponent,
    AdminLayoutComponent,
    ChatbotQuestionComponent,
    ChatbotEvalComponent,
    ChatbotEvalConversationComponent,
    ArticlesComponent,
    ArticlesEditComponent,
    ArticleViewComponent,
    RecursoExternoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ChartsModule,
    TableModule,
    RatingModule,
    GrowlModule,
    ConfirmDialogModule,
    EditorModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    YoutubePlayerModule
  ],
  providers: [AuthService, ChatbotService, AdminService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
