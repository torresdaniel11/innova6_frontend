import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//librerias externas
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//Servicios
import { AuthService } from './_servicios/auth.service';
import { ChatbotService } from './_servicios/chatbot.service';

//vistas
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { EquipoGtiComponent } from './equipo-gti/equipo-gti.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ContectenosComponent } from './contectenos/contectenos.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

//layouts
import { LayoutComponent } from './_layout/layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { TreeComponent } from './tree/tree.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ChatbotQuestionComponent } from './chatbot-question/chatbot-question.component';


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
    ChatbotQuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [AuthService, ChatbotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
