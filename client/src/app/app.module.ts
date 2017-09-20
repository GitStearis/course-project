import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate/ng2-translate';
import { NG_TABLE_DIRECTIVES, Ng2TableModule } from 'ng2-table/ng2-table';
import * as $ from 'jquery';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing, appRoutingProviders } from './app.routing';

import { MessagesService } from '../../node_modules/ng2-messages/ng2-messages.service';
import { MessagesComponent } from '../../node_modules/ng2-messages/ng2-messages.component';

import { MarkdownModule } from 'angular2-markdown';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DonationComponent } from './components/donation/donation.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectComponent } from './components/project/project/project.component';
import { AdminComponent } from './components/admin/admin.component';

import { AuthService } from './services/auth/auth.service';
import { CreateComponent } from './components/project/create/create.component';
import { AdminService } from './services/admin/admin.service';
import { ImgCloudinaryService } from './services/img/img-cloudinary.service';
import { UserComponent } from './components/user/user.component';
import { FooterComponent } from './components/footer/footer.component';
import { VerificationPageComponent } from './components/verification-page/verification-page.component';
import { CheckingComponent } from './components/checking/checking.component';
import { CreatedProjectsComponent } from './components/created-projects/created-projects.component';
import { CommentComponent } from './components/comment/comment.component';
import { CreateNewsComponent } from './components/news/create-news/create-news.component';
import { AllNewsComponent } from './components/news/all-news/all-news.component';
import { NewsComponent } from './components/news/news/news.component';
import { AllProjectsComponent } from './components/project/all-projects/all-projects.component';
import { AllProjectNewsComponent } from './components/news/all-project-news/all-project-news.component';
import { CheckByAdminComponent } from './components/checking/check-by-admin/check-by-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    ProfileComponent,
    NotfoundComponent,
    DonationComponent,
    LoginComponent,
    ProjectComponent,
    AdminComponent,
    MessagesComponent,
    CreateComponent,
    UserComponent,
    FooterComponent,
    VerificationPageComponent,
    CheckingComponent,
    CreatedProjectsComponent,
    CommentComponent,
    CreateNewsComponent,
    AllNewsComponent,
    NewsComponent,
    AllProjectsComponent,
    AllProjectNewsComponent,
    CheckByAdminComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    routing,
    MarkdownModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) =>
        new TranslateStaticLoader(http, '../assets/i18n', '.json'),
      deps: [Http]
    }),
    Ng2TableModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    MessagesService,
    AdminService,
    ImgCloudinaryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
