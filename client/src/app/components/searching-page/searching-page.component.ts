import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Project } from "../../project";

@Component({
  selector: "app-searching-page",
  templateUrl: "./searching-page.component.html",
  styleUrls: ["./searching-page.component.css"]
})
export class SearchingPageComponent implements OnInit {
  projects: Project[];
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.route.params.subscribe(params => {
      this.query = params.query;
      this.http
        .get(`/api/search?q=${this.query}`)
        .map(data => JSON.stringify(data))
        .subscribe(
          async data => {
            this.projects = await JSON.parse(data);
            console.log(this.projects);
          },
          err => {
            if (err.error instanceof Error) {
              console.log("An error occurred:", err.error.message);
            } else {
              console.log(err);
              console.log(
                `Backend returned code ${err.status}, body was: ${err.error}`
              );
            }
            this.router.navigate(["/404"]);
          }
        );
    });
  }
  ngOnInit() {}
}
