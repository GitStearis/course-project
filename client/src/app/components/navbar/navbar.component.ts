import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
