import { Component, OnInit, ElementRef } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TranslateService } from 'ng2-translate';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService, private elementRef: ElementRef, public translate: TranslateService) {}

  private dark = 'https://bootswatch.com/darkly/bootstrap.min.css';
  private light = 'https://bootswatch.com/flatly/bootstrap.min.css';

  private icon = 'fa-sun-o';
  public browserLang = '';

  ngOnInit() {
    this.initializeStyle();
    this.initializeLanguage();
  }

  // ================== Style section ==========================
  initializeStyle() {
    if (Cookie.get('style') === null) {
      this.onChange();
    } else {
      this.changeStyle(Cookie.get('style'));
      this.icon = Cookie.get('icon');
    }
  }

  onChange() {
    if (Cookie.get('style') === this.dark || Cookie.get('style') === null) {
      Cookie.set('icon', 'fa-moon-o');
      this.changeStyle(this.light);
    } else {
      Cookie.set('icon', 'fa-sun-o');
      this.changeStyle(this.dark);
    }
    this.icon = Cookie.get('icon');
  }

  changeStyle(style) {
    style === 'null' ? style = this.dark : style = style;
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.href === this.dark || link.href === this.light) {
        Cookie.set('style', style);
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
      console.log(Cookie.get('lang'));
      this.browserLang = localStorage.getItem('lang');
      this.translate.use(this.browserLang);
    }
  }

  changeLanguage(lang) {
    this.translate.use(lang);
    // Cookie.set('lang', lang);
    localStorage.setItem('lang', lang);
  }

}
