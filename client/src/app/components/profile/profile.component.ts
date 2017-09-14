import { Component, OnInit } from '@angular/core';
import { NotfoundComponent } from '../notfound/notfound.component';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string;
  name: string;
  firstname: string;
  secondname: string;
  phone: string;
  date: string;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.email = localStorage['email'];
    this.name = localStorage['name'];
    this.firstname = localStorage['firstname'];
    this.secondname = localStorage['secondname'];
    this.phone = localStorage['phone'];
    this.date = localStorage['date'];
  }
}
