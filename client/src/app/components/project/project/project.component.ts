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

  starsCount: number;
  averageRating: number = 0;
  progress: number = 0;
  comment: string = '';

  isVoted: boolean = false;

  private rateProject() {

    const newRating = {
      user: localStorage['name'],
      rating: this.starsCount
    }

    this.http
    .post('/api/project/' + this.pageId + '/rate', newRating)
    .map(data => JSON.stringify(data))
    .subscribe(
    data => {  
      this.averageRating = parseInt(data);
      this.isVoted = true; 
    });
  }

  private calculateRating() {
    return this.project.ratings.reduce(function (acc, obj) { return acc + parseInt(obj.rating); }, 0) / this.project.ratings.length;
  }

  private checkVoting() {
    console.log(this.isVoted);
    let voter = this.project.ratings.find(x => x.user === localStorage['name'])
    if(voter) {
      this.starsCount = parseInt(voter.rating);
      return true;
    }
    return false;
  }

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

          this.averageRating = this.calculateRating();
          this.isVoted = this.checkVoting();

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
        });
    });
  }

  public onFollow() {
    let newFollower = localStorage['email'];
    this.http.post(`/api/project/${this.pageId}/follow`, {follower: newFollower})
    .subscribe(data => {
    });
  }

  ngOnInit() {
    this.project = {
      pageId: "",
      date: "",
      created: "",
      goal: "",
      collected: "",
      image: "",
      body: "",
      description: "",
      title: "",
      author: "",
      status: "",
      ratings: [{
          user: "",
          rating: ""
      }]
    }
   }

}
