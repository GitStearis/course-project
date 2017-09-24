import { Component, OnInit, ElementRef } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TranslateService } from 'ng2-translate';

import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService, private elementRef: ElementRef, public translate: TranslateService, 
  public http: HttpClient, 
  private router: Router) {}

  private dark = 'http://localhost:4200/assets/css/darkly-bootstrap.min.css';
  private light = 'http://localhost:4200/assets/css/flatly-bootstrap.min.css';

  private icon = 'fa-sun-o';
  public browserLang = '';

  ngOnInit() {
    // localStorage.setItem('style', null);
    this.initializeStyle();
    this.initializeLanguage();
  }
  
  // ================== Style section ==========================
  initializeStyle() {
    if (localStorage.getItem('style') === null) {
      this.onChange();
    } else {
      this.changeStyle(localStorage.getItem('style'));
      this.icon = localStorage.getItem('icon');
    }
  }

  onChange() {
    if (localStorage.getItem('style') === this.dark || localStorage.getItem('style') === null) {
      localStorage.setItem('icon', 'fa-moon-o');
      this.changeStyle(this.light);
    } else {
      localStorage.setItem('icon', 'fa-sun-o');
      this.changeStyle(this.dark);
    }
    this.icon = localStorage.getItem('icon');
  }

  changeStyle(style) {
    style === 'null' ? style = this.dark : style = style; 
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      console.log(link.href === this.dark);
      if (link.href === this.dark || link.href === this.light) {
        console.log(style);
        localStorage.setItem('style', style);
        link.href = style;
      }
    }
  }

  // ================== Language section ==========================
  initializeLanguage() { 
    if (localStorage.getItem('lang') === null) {
      this.browserLang = this.translate.getBrowserLang();
      this.changeLanguage(this.browserLang.match(/en|ru/) ? this.browserLang : 'en');
    } else {
      this.browserLang = localStorage.getItem('lang');
      this.translate.use(this.browserLang);
    }
  }

  changeLanguage(lang) {
    this.translate.use(lang);
    // Cookie.set('lang', lang);
    localStorage.setItem('lang', lang);
  }

  // ================== Searching section ==========================
  searchQuery(event){
    let input = encodeURI(event.target.value);
    console.log(input);
    if(event.keyCode == 13) {
      this.router.navigate([`search/${input}`]);
    }
  }

}
