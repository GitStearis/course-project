import { Component, OnInit } from '@angular/core';
import { NotfoundComponent } from '../notfound/notfound.component';

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  email: string;
  username: string;


  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.email = localStorage['email'];
    this.username = localStorage['username'];
  }

}
