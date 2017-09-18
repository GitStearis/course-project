import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../project';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  projects: Project[];

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
      this.route.params.subscribe(params => {
        this.http
          .get('/api/projects/all')
          .map(data => JSON.stringify(data))
          .subscribe(
          data => {
            this.projects = JSON.parse(data);
            console.log(this.projects);
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
