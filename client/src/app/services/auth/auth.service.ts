import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Profile } from "../../profile";
import "rxjs/add/operator/map";
import { MessagesService } from '../../../../node_modules/ng2-messages/ng2-messages.service';

@Injectable()
export class AuthService {

  profile: Profile;
  date: string;

  constructor(private router: Router, private http: HttpClient, public msg: MessagesService) { }

  removeWarnings() {
    this.msg.messages.subscribe(data => {
      let flag = true;
      for (let id in data['warning']) {
        if (flag === true) {
          flag = false;
        } else {
          this.msg.remove(id);
        }
      }
    })
  }
  removeAllWarnings() {
    this.msg.messages.subscribe(data => {
      for (let id in data['warning']) {
          this.msg.remove(id);
      }
    })
  }

  public isAuthenticated() {
    return this.isLoggedIn();
  }

  public saveToLocal(parsed) {
    localStorage["mean-token"] = parsed.token;
    localStorage["email"] = parsed.email,
      localStorage["name"] = parsed.name,
      localStorage["firstname"] = parsed.firstname,
      localStorage["secondname"] = parsed.secondname,
      localStorage["phone"] = parsed.phone
    localStorage["date"] = parsed.date;
  }

  public getToken() {
    return localStorage["mean-token"];
  }

  public isLoggedIn() {
    let token = this.getToken();
    let payload;

    if (token) {
      payload = token.split(".")[1];
      payload = atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public currentUser() {
    if (this.isLoggedIn()) {
      let token = this.getToken();
      let payload = token.split(".")[1];
      payload = atob(payload);
      payload = JSON.parse(payload);
      return {
        email: payload.email,
        name: payload.name
      };
    }
  }

  public register(user: Profile) {
    this.http
      .post("/api/register", user)
      .map(data => JSON.stringify(data))
      .subscribe(
      data => {
        this.msg.success("Registration completed successfully!");
        console.log(data);
        this.saveToLocal(JSON.parse(data));
      },
      err => {
        this.removeWarnings();
        this.msg.warning('An error occured, please, try again.');
        if (err.error instanceof Error) {
          console.log("An error occurred:", err.error.message);
        } else {
          console.log(err);
          console.log(
            `Backend returned code ${err.status}, body was: ${err.error}`
          );
        }
      }
      );
  }

  public login(user: Profile) {
    this.msg
    this.http
      .post("/api/login", user)
      .map(data => JSON.stringify(data))
      .subscribe(
      data => {
        this.removeAllWarnings();
        this.msg.success("Successfully logged in!");
        console.log(data);
        this.saveToLocal(JSON.parse(data));
      },
      err => {
        this.removeWarnings();
        if (err.error instanceof Error) {
          console.log("An error occurred:", err.error.message);
          this.msg.warning('An error occured: ' + err.error.message);
        } else {
          this.msg.warning('Bad login or password. Please, try again.');
          console.log(err);
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
      );
  }

  public logout() {
    localStorage.removeItem("mean-token");
    this.router.navigate(["/"]);
  }
}