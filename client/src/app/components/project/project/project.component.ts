import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  pageId: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.pageId = params.pageId;
      this.http
        .get("/api/project/" + this.pageId)
        .map(data => JSON.stringify(data))
        .subscribe(
        data => {
          console.log(data);
        },
        err => {
          if (err.error instanceof Error) {
            console.log("An error occurred:", err.error.message);
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
