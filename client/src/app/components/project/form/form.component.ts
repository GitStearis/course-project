import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Profile } from "../../../profile";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  CLOUDYNARY_URL: string = "";
  CLOUDYNARY_UPLOAD_PRESET: string = "";

  constructor(private http: HttpClient, public auth: AuthService) {}

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
  }

  ngOnInit() {}
}
