import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../../services/auth/auth.service";
import { MessagesService } from "../../../../../node_modules/ng2-messages/ng2-messages.service";
import { ImgCloudinaryService } from "../../../services/img/img-cloudinary.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-check-by-admin",
  templateUrl: "./check-by-admin.component.html",
  styleUrls: ["./check-by-admin.component.css"]
})
export class CheckByAdminComponent implements OnInit {
  @Input() person: string;
  @Input() image: string;

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private router: Router,
    public msg: MessagesService
  ) {}

  public submit() {
    // this.http.post("/api/confirm", {user: this.person})
    // .map(data => JSON.stringify(data))
    // .subscribe(response => {
    //   this.auth.removeAllWarnings();
    //   window.scrollTo(0, 0);
    //   this.msg.success(`Successfully recieved data: ${response}`);
    //   console.log(`Successfully recieved data: ${response}`);
    //   this.router.navigate(['/']);
    // });
  }

  ngOnInit() {
    console.log(`Passport scan url ${this.image} for user ${this.person}`);
  }
}