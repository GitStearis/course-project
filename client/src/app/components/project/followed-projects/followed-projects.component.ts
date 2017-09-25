import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../project';

@Component({
  selector: 'app-followed-projects',
  templateUrl: './followed-projects.component.html',
  styleUrls: ['./followed-projects.component.css']
})
export class FollowedProjectsComponent implements OnInit {

  followedProjects: Project[];
  name: string = '';

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
      this.route.params.subscribe(params => {
        this.name = params.name;
        this.http
          .get('/api/user/' + this.name + '/followed')
          .map(data => JSON.stringify(data))
          .subscribe(
          data => {
            this.followedProjects = JSON.parse(data);
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
