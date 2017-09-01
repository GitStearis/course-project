import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  username: string;
  password: string;

  constructor(private http: HttpClient, public auth: AuthService) { }

  ngOnInit() {
  }

  saveEmail(event: any) {
    this.email = event.target.value;
  }

  saveUsername(event: any) {
    this.username = event.target.value;
  }

  savePassword(event: any) {
    this.password = event.target.value;
  }

  submit() {
    console.log(this.email);
    console.log(this.username);
    console.log(this.password);

    this.auth.login(this.email, this.username, this.password);
  }
}
