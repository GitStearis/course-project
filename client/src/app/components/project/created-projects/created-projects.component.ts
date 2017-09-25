import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../project';

@Component({
  selector: 'app-created-projects',
  templateUrl: './created-projects.component.html',
  styleUrls: ['./created-projects.component.css']
})
export class CreatedProjectsComponent implements OnInit {

  createdProjects: Project[];
  name: string = '';

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
      this.route.params.subscribe(params => {
        this.name = params.name;
        this.http
          .get('/api/user/' + this.name + '/created')
          .map(data => JSON.stringify(data))
          .subscribe(
          data => {
            this.createdProjects = JSON.parse(data);
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
