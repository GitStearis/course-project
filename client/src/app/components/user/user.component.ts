import { Component, OnInit } from "@angular/core";
import { NotfoundComponent } from "../notfound/notfound.component";

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  email: string;
  name: string;
  firstname: string;
  secondname: string;
  phone: string;
  date: string;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.email = localStorage["email"];
    this.name = localStorage["name"];
    this.firstname = localStorage["firstname"];
    this.secondname = localStorage["secondname"];
    this.phone = localStorage["phone"];
    this.date = localStorage["date"];
  }
}
