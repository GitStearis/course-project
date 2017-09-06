import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Profile } from "../../profile";

import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  name: string;
  password: string;

  constructor(private http: HttpClient, public auth: AuthService) { }

  isEmailValid(): boolean {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEXP.test(this.email)) {
      return false;
    }
    return true;
  }
  checkFirstPage(): boolean {
    if (this.isEmailValid() === true && this.checkPasswordLength() === true) {
      return true;
    }
    return false;
  }
  checkFields(first, second): boolean {
    if (first && second) {
      return true
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

  savePassword(event: any) {
    this.password = event.target.value;
  }

  submit() {
    let user: Profile = {
      email: this.email,
      name: "",
      password: this.password,
      firstname: "",
      secondname: "",
      phone: ""
    };

    this.auth.login(user);
  }

  ngOnInit() { }
}

