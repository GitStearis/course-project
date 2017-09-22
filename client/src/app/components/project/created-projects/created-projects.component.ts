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
        console.log('/api/user/' + this.name + '/created');
        this.http
          .get('/api/user/' + this.name + '/created')
          .map(data => JSON.stringify(data))
          .subscribe(
          data => {
            console.log(data);
            this.createdProjects = JSON.parse(data);
            console.log(this.createdProjects);
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
