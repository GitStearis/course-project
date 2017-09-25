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
        this.userList = JSON.parse(data);
      }),
      err => {
        
      };
  }
}
