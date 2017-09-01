import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  username: string;
  password: string;

  constructor(private http: HttpClient) { }

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

    this.http.get("http://localhost:3000/login/" + this.email + "/" + this.username + "/" + this.password)
      .subscribe(data => {
        console.log(data);
      }, err => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        }
        else {
          console.log(err);
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }
}
