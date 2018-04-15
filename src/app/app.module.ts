import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// librerias externas
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';

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

// --admin
import { AdminComponent } from './admin/admin/admin.component';
import { TreeComponent } from './admin/tree/tree.component';
import { ChatbotQuestionComponent } from './admin/chatbot-question/chatbot-question.component';
import { ChatbotEvalComponent } from './admin/chatbot-eval/chatbot-eval.component';
import { ChatbotEvalConversationComponent } from './admin/chatbot-eval-conversation/chatbot-eval-conversation.component';

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
      {path: 'admin/chatbot_eval/:id', component: ChatbotEvalConversationComponent }
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
    ChatbotEvalConversationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [AuthService, ChatbotService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
