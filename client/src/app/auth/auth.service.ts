import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  currentProfile: Profile;
  isRegistred: Boolean;

  constructor(private router: Router, private http: HttpClient) { }

  public register(email, username, password) {
    this.http.get("http://localhost:3000/registration/" + email + "/" + username + "/" + password)
      .map(data => JSON.stringify(data))
      .subscribe(data => {
        let resp = JSON.parse(data);

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

  public login(email, username, password) {
    this.http.get("http://localhost:3000/login/" + email + "/" + username + "/" + password)
      .map(data => JSON.stringify(data))
      .subscribe(data => {
        this.currentProfile = JSON.parse(data);
        this.saveToLocalStorage(this.currentProfile.email, this.currentProfile.username);
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

  public logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.setItem('isLogged', 'false');
    this.router.navigate(['/']);
  }

  public isAuthenticated() {
    const isLogged: Boolean = JSON.parse(localStorage.getItem('isLogged'));
    return isLogged;
  }

  private saveToLocalStorage(email, username) {
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('isLogged', 'true');
  }

  private checkRegistration(response) {
    if (response === "true") {
      return true;
    } else {
      return false
    }
  }


}

interface Profile {
  email: String,
  username: String,
  password: String,
}
