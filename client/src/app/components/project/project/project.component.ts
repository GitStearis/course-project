import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../project';
import { News } from '../../../news';
import { Com } from '../../../com';

import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  pageId: string;
  project: Project;
  newsList: News[];
  commentList: Com[];

  progress: number = 0;

  comment: string = '';

  public isProject(status: string): boolean {
    if (this.project.status === status) {
      return true;
    }
    return false;
  }

  public isAuthor(): boolean {
    if (localStorage['name'] === this.project.author) {
      return true;
    }
    return false;
  }
  
  
  private submit() {
    console.log(this.comment);

    const newComment = {
      pageId: this.pageId,
      body: this.comment,
      author: localStorage['name']
    };

    this.http
      .post('/api/comment/add', newComment)
      .map(data => data as Com)
      .subscribe(
      data => {   
        this.commentList.push(data);
      },
      err => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(err);
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }

  constructor(public auth: AuthService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.pageId = params.pageId;
      this.http
        .get('/api/project/' + this.pageId)
        .map(data => JSON.stringify(data))
        .subscribe(
        data => {
          this.project = JSON.parse(data);
          this.progress = parseInt(this.project.collected, 10) / parseInt(this.project.goal, 10) * 100;

          this.http
            .get('/api/news/' + this.pageId + '/recent')
            .map(recent => JSON.stringify(recent))
            .subscribe(
            recent => {
              this.newsList = JSON.parse(recent);

              this.http
              .get('/api/comment/' + this.pageId)
              .map(com => JSON.stringify(com))
              .subscribe(
              com => {
                this.commentList = JSON.parse(com);
              });
            });
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

  me: string = "Margarita";

  ngOnInit() { }

}
