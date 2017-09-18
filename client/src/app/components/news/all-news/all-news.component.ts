import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { News } from '../../../news';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  newsList: News[];

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
      this.route.params.subscribe(params => {
        this.http
          .get('api/news/all')
          .map(data => JSON.stringify(data))
          .subscribe(
          data => {
            console.log(data);
            this.newsList = JSON.parse(data);
            console.log(this.newsList);
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
