import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Profile } from "../../../profile";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  CLOUDYNARY_URL: string = "https://api.cloudinary.com/v1_1/itra-courseproject/image/upload";
  CLOUDYNARY_UPLOAD_PRESET: string = "nw6hxewv";

  public projectName: string;
  public description: string = "";
  public body: string = "";
  public image: string = "https://pp.userapi.com/c639726/v639726376/1b0e8/-rCpYgJ08pM.jpg";
  public goal: string = "";
  public deadline: string = "";
  public tags: string = "";

  constructor(private http: HttpClient, public auth: AuthService) {}

  private getFromInput(value, target) {
    console.log(value);
    console.log(target);
    if (value) {
      target = value;
    }
    console.log(this.projectName);
  }

  private deafultErrorMessage(err: any) {
    this.auth.removeWarnings();
    this.auth.msg.warning("An error occured, please, try again.");
    if (err.error instanceof Error) {
      console.log("An error occurred:", err.error.message);
    } else {
      console.log(err);
      console.log(
        `Backend returned code ${err.status}, body was: ${err.error}`
      );
    }
  }

  public fileUploading(event: any) {
    let imgPreview = document.getElementById("img-preview");
    let fileUpload = document.getElementById("file-upload");

    let file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", this.CLOUDYNARY_UPLOAD_PRESET);

    /*axios({
      url: this.CLOUDYNARY_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: formData
    })
      .then(function(res) {
        console.log(res);
        imgPreview.src = res.data.secure_url;
      })
      .catch(function(err) {
        console.log(err);
      });*/

    this.http
      .post(
        this.CLOUDYNARY_URL,
        {
          file: formData
        },
        {
          headers: new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
          )
        }
      )
      .map(data => JSON.stringify(data))
      .subscribe(
        data => {
          console.log(data);
          let res = JSON.parse(data);
          // imgPreview.src = res.data.secure_url;
          document
            .getElementById("img-preview")
            .setAttribute("src", res.data.secure_url);
        },
        err => {
          this.deafultErrorMessage(err);
        }
      );
  }

  public submit() {
    let project = {
      title: this.projectName,
      description: this.description,
      body: this.body,
      image: this.image,
      goal: this.goal,
      date: this.deadline,
      tags: this.tags
    };

    this.http
      .post("/api/project/new", project)
      .map(data => JSON.stringify(data))
      .subscribe(
        data => {
          this.auth.msg.success("Project creating completed successfully!");
          console.log(data);
        },
        err => {
          this.deafultErrorMessage(err);
        }
      );
  }

  ngOnInit() {}
}
