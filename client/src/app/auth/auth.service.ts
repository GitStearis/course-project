import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  currentProfile: Profile;
  isRegistrated: Boolean;
  isLoggedIn: Boolean = false;

  constructor(private router: Router, private http: HttpClient) { }

  public register(email, username, password) {
    this.http.get("http://localhost:3000/registration/" + email + "/" + username + "/" + password)
      .map(data => JSON.stringify(data))
      .subscribe(data => {
        console.log(data);
        this.isRegistrated = this.checkRegistration(JSON.parse(data));
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
        console.log(data);
        this.currentProfile = JSON.parse(data);
        localStorage['isLoggedIn'] = this.checkLogin(JSON.parse(data));

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
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }

  public isAuthenticated() {
    return localStorage['isLoggedIn'];
  }

  private saveToLocalStorage(email, username) {
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
  }

  private checkRegistration(response) {
    if (response === "true") {
      return true;
    } else {
      return false
    }
  }

  private checkLogin(response) {
    if (response === null) {
      return false;
    } else {
      this.saveToLocalStorage(this.currentProfile.email, this.currentProfile.username);
      return true;
    }
  }
}

interface Profile {
  email: String,
  username: String,
  password: String,
}
