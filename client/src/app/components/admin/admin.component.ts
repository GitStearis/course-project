import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AdminService } from "../../services/admin/admin.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient, public admin: AdminService) {
    this.getUserList();
  }

  ngOnInit() {}

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