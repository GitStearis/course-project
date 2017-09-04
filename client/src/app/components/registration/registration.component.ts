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
  username: string;
  password: string;
  firstname: string;
  secondname: string;
  phone: string;

  constructor(private http: HttpClient, public auth: AuthService) {}

  saveEmail(event: any) {
    this.email = event.target.value;
  }

  saveUsername(event: any) {
    this.username = event.target.value;
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
      name: this.username,
      password: this.password,
      firstname: this.firstname,
      secondname: this.secondname,
      phone: this.phone
    };

    this.auth.register(user);
  }

  ngOnInit() {}
}

