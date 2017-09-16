import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../project';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  actualProjects: Project[];
  newProjects: Project[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, translate: TranslateService) {
    this.route.params.subscribe(params => {
      this.http
        .get('/api/projects/new')
        .map(data => JSON.stringify(data))
        .subscribe(
        data => {
          this.newProjects = JSON.parse(data);
          console.log(this.newProjects);

          this.http
          .get('/api/projects/actual')
          .map(actual => JSON.stringify(actual))
          .subscribe(
          actual => {
            this.actualProjects = JSON.parse(actual);
            console.log(this.actualProjects);
          },
          err => {
            if (err.error instanceof Error) {
              console.log('An error occurred:', err.error.message);
            } else {
              console.log(err);
              console.log(
                `Backend returned code ${err.status}, body was: ${err.error}`
              );
            }
          });
        },
        err => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log(err);
            console.log(
              `Backend returned code ${err.status}, body was: ${err.error}`
            );
          }
        });
    });

  }

  ngOnInit() {
  }

}
