import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { News } from '../../../news';

@Component({
  selector: 'app-all-project-news',
  templateUrl: './all-project-news.component.html',
  styleUrls: ['./all-project-news.component.css']
})
export class AllProjectNewsComponent implements OnInit {

  newsList: News[];
  pageId: string = "";

      constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
        this.route.params.subscribe(params => {
          this.pageId = params.pageId;
          this.http
            .get('api/news/' + this.pageId + '/all')
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
