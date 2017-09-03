import { Component, OnInit, ElementRef } from "@angular/core";
import { RegistrationComponent } from "../registration/registration.component";
import { LoginComponent } from "../login/login.component";

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService, private elementRef: ElementRef) {}


  private dark: string = 'https://bootswatch.com/darkly/bootstrap.min.css';
  private light: string = 'https://bootswatch.com/flatly/bootstrap.min.css';

  private icon: string = 'fa-sun-o';

  ngOnInit() {
    localStorage['icon'] = this.icon;
    localStorage['style'] = this.dark;
  }

  onChange() {
    if (localStorage['style'] === this.dark || localStorage['style'] === undefined) {
      localStorage['icon'] = 'fa-moon-o';
      this.changeStyle(this.light);
    } else {
      localStorage['icon'] = 'fa-sun-o';
      this.changeStyle(this.dark);
    }
    this.icon = localStorage['icon'];
  }

  changeStyle(style) {
    style === 'undefined' ? style = this.dark : style = style;
    let links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      if (link.href === this.dark || link.href === this.light) {
        localStorage['style'] = style;
        link.href = style;
      }
    }
  }
}
