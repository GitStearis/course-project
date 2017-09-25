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

  achievements: any = {
    registrated: "../../../assets/images/achievements/3.png",
    comment: "../../../assets/images/achievements/1.png",
    project: "../../../assets/images/achievements/4.png",
    donate: "../../../assets/images/achievements/2.png",
    rate: "../../../assets/images/achievements/6.png"
  }

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
  showingAchievements: boolean = false;

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
          this.saveProfile(JSON.parse(data));
        },
        err => {
          this.router.navigate(['/404']);
        }
        );
    });

  }

  public showAchievements(state: boolean) {
    this.showingAchievements = state;
  }

  ngOnInit() {

  }

}
