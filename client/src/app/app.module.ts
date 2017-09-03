import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { Http } from "@angular/http";

import { routing, appRoutingProviders } from "./app.routing";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { UserComponent } from "./components/user/user.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { DonationComponent } from "./components/donation/donation.component";
import { LoginComponent } from "./components/login/login.component";
import { ProjectComponent } from "./components/project/project.component";

import { AuthService } from "./auth/auth.service";

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
    ProjectComponent
  ],
  imports: [HttpModule, HttpClientModule, BrowserModule, routing],
  providers: [appRoutingProviders, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
