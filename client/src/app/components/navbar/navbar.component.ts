import { Component, OnInit } from "@angular/core";
import { RegistrationComponent } from "../registration/registration.component";
import { LoginComponent } from "../login/login.component";

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService) {}

  private style: string;

  ngOnInit() {
    this.changeStyle("light");
  }

  onChange() {
    if (this.style === "light") this.changeStyle("dark");
    else this.changeStyle("light");
  }

  changeStyle(style) {
    this.style = style;
    let links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      if (
        link.getAttribute("rel").indexOf("style") != -1 &&
        link.getAttribute("title")
      ) {
        link.disabled = true;
        if (link.getAttribute("title") === this.style) link.removeAttribute('disabled');
      }
    }
  }
}
