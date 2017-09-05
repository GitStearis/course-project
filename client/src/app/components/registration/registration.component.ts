import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Profile } from "../../profile";

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  email: string;
  name: string;
  password: string;
  firstname: string;
  secondname: string;
  phone: string;

  constructor(private http: HttpClient, public auth: AuthService) { }

  isPhoneValid(): boolean {
    let PHONE_REGEXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!PHONE_REGEXP.test(this.phone)) {
      return false;
    }
    return true;   
  }
  isEmailValid(): boolean {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEXP.test(this.email)) {
      return false;
    }
    return true;
  }
  checkFirstPage(): boolean {
    if (this.isEmailValid() === true && this.checkUsernameLength() === true && this.checkPasswordLength() === true) {
      return true;
    }
    return false;
  }
  checkSecondPage(): boolean {
    if (this.checkEmptiness(this.firstname) === true && this.checkEmptiness(this.secondname) === true && this.isPhoneValid() === true) {
      return true;
    }
    else false;
  }
  checkFields(): boolean {
    if (this.email && this.name && this.password) {
      return true
    }
    return false;
  }
  checkUsernameLength(): boolean {
    if (this.name) {
      if (this.name.length >= 3) {
        return true
      }
    }
    return false;
  }
  checkPasswordLength(): boolean {
    if (this.password) {
      if (this.password.length >= 8) {
        return true
      }
      return false;
    }
  }
  checkEmptiness(str: string): boolean {
    if (str) {
      return true;
    }
    return false;
  }

  saveEmail(event: any) {
    this.email = event.target.value;
  }

  saveName(event: any) {
    this.name = event.target.value;
  }

  savePassword(event: any) {
    this.password = event.target.value;
  }

  saveFirstname(event: any) {
    this.firstname = event.target.value;
  }

  saveSecondname(event: any) {
    this.secondname = event.target.value;
  }

  savePhone(event: any) {
    this.phone = event.target.value;
  }

  submit() {
    let user: Profile = {
      email: this.email,
      name: this.name,
      password: this.password,
      firstname: this.firstname,
      secondname: this.secondname,
      phone: this.phone
    };
    console.log(user);
    this.auth.register(user);
  }

  ngOnInit() { }
}

