import { Component, OnInit } from '@angular/core';
import { NotfoundComponent } from '../notfound/notfound.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

pageId: string = '';
value: number = 0;

  constructor(private route: ActivatedRoute, public auth: AuthService, private http: HttpClient, private location: Location) { }

  public back() {
    this.location.back();
  }
  public continue() {
    this.http
    .get('/api/project/' + this.pageId + '/donate/' + this.value)
    .map(data => JSON.stringify(data))
    .subscribe(
    data => {
      console.log(data);
    },
    err => {
      if (err.error instanceof Error) {
        console.log('An error occurred:', err.error.message);
      } else {
        console.log(err);
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    }
    );
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.pageId = params.pageId;
      console.log(params);
    });
  }

}
