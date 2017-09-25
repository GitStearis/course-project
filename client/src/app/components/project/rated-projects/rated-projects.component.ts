import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../project';

@Component({
  selector: 'app-rated-projects',
  templateUrl: './rated-projects.component.html',
  styleUrls: ['./rated-projects.component.css']
})
export class RatedProjectsComponent implements OnInit {

  ratedProjects: Project[];
  name: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.name = params.name;
      this.http
        .get('/api/user/' + this.name + '/rated')
        .map(data => JSON.stringify(data))
        .subscribe(
        data => {
          this.ratedProjects = JSON.parse(data);
        },
        err => {
          this.router.navigate(['/404']);
        }
        );
    });
  }
  ngOnInit() {
  }
}
