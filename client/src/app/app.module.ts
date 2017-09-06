import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { Http } from "@angular/http";

import { routing, appRoutingProviders } from "./app.routing";

import { MarkdownModule } from "angular2-markdown";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { UserComponent } from "./components/user/user.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { DonationComponent } from "./components/donation/donation.component";
import { LoginComponent } from "./components/login/login.component";
import { ProjectComponent } from "./components/project/project/project.component";
import { AdminComponent } from "./components/admin/admin.component";
import { PreviewComponent } from "./components/project/preview/preview.component";

import { AuthService } from "./services/auth/auth.service";
import { FormComponent } from "./components/project/form/form.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    UserComponent,
    NotfoundComponent,
    DonationComponent,
    LoginComponent,
    ProjectComponent,
    AdminComponent,
    PreviewComponent,
    FormComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    routing,
    MarkdownModule.forRoot()
  ],
  providers: [appRoutingProviders, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
