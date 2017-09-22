import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../profile';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  profile: Profile = {
    email: '',
    name: '',
    password: '',
    firstname: '',
    secondname: '',
    phone: '',
    tipped: 0
  };
  date: string;
  username: string;

  private saveProfile(parsed) {
    this.profile = {
      email: parsed.email,
      name: parsed.name,
      password: '',
      firstname: parsed.firstname,
      secondname: parsed.secondname,
      phone: parsed.phone,
      tipped: parseInt(parsed.tipped)
    };
    this.date = parsed.date;
  }

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, public auth: AuthService) {
    this.route.params.subscribe(params => {
      this.username = params.username;
      this.http
        .get('/api/user/' + params.username)
        .map(data => JSON.stringify(data))
        .subscribe(
        data => {
          console.log(data);
          this.saveProfile(JSON.parse(data));
        },
        err => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log(err);
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
          this.router.navigate(['/404']);
        }
        );
    });

  }

  ngOnInit() {

  }

}
