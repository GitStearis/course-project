import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { News } from '../../../news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News;
  newsId: string;
  
      constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
        this.route.params.subscribe(params => {
          this.newsId = params.newsId;
          this.http
            .get('api/news/' + this.newsId)
            .map(data => JSON.stringify(data))
            .subscribe(
            data => {
              this.news = JSON.parse(data);
              this.news = this.news[0];
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
