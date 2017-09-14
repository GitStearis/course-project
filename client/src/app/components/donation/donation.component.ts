import { Component, OnInit } from '@angular/core';
import { NotfoundComponent } from '../notfound/notfound.component';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  constructor(public auth: AuthService, private location: Location) { }

  public back() {
    this.location.back();
  }
  public continue() {

  }

  ngOnInit() {
  }

}
