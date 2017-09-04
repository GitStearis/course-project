import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Profile } from "../../profile";

import { AuthService } from "../../auth/auth.service";

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

  saveEmail(event: any) {
    this.email = event.target.value;
  }

  saveName(event: any) {
    this.name = event.target.value;
  }

  savePassword(event: any) {
    this.password = event.target.value;
  }

  submit() {
    let user: Profile = {
      email: this.email,
      name: this.name,
      password: this.password,
      firstname: "",
      secondname: "",
      phone: ""
    };

    this.auth.login(user);
  }

  ngOnInit() { }
}

