import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../project';
import { News } from '../../news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  actualProjects: Project[];
  newProjects: Project[];
  newsList: News[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.http
        .get('/api/projects/new')
        .map(data => JSON.stringify(data))
        .subscribe(
        data => {
          this.newProjects = JSON.parse(data);

          this.http
          .get('/api/projects/actual')
          .map(actual => JSON.stringify(actual))
          .subscribe(
          actual => {
            this.actualProjects = JSON.parse(actual);

            this.http
            .get('/api/news/recent')
            .map(news => JSON.stringify(news))
            .subscribe(
            news => {
              this.newsList = JSON.parse(news);
            });
          });
        });
    });

  }

  ngOnInit() {
  }

}
