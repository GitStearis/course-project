import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Profile } from "../../profile";
import "rxjs/add/operator/map";

@Injectable()
export class AdminService {
  constructor(private router: Router, private http: HttpClient) {}

  public userList: any[];

  public getUserList() {
    this.http
      .get("/api/userlist")
      .map(data => JSON.stringify(data))
      .subscribe(data => {
        console.log(data);
        this.userList = JSON.parse(data);
      }),
      err => {
        if (err.error instanceof Error) {
          console.log("An error occurred:", err.error.message);
        } else {
          console.log(err);
          console.log(
            `Backend returned code ${err.status}, body was: ${err.error}`
          );
        }
      };
  }
}
