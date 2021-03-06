import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";

  constructor(translate: TranslateService) {
    translate.addLangs(["en", "ru"]);
    translate.setDefaultLang('en');
  }
}
