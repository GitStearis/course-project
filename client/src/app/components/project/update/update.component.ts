import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../../../profile';
import { AuthService } from '../../../services/auth/auth.service';
import { MessagesService } from '../../../../../node_modules/ng2-messages/ng2-messages.service';
import { ImgCloudinaryService } from '../../../services/img/img-cloudinary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from 'q';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Project } from '../../../project';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  CLOUDYNARY_URL = 'https://api.cloudinary.com/v1_1/itra-courseproject/image/upload';
  CLOUDYNARY_UPLOAD_PRESET = 'nw6hxewv';

  public projectName: string = '';
  public description: string = '';
  public body: string = '';
  public image: string = '';
  public goal: string = '';
  public deadline: string = '';
  public creation: string = new Date().toJSON().slice(0, 10);
  public tags: any[] = [];
  public author: string = localStorage['name'];

  pageId: string;
  project: Project;

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    public element: ElementRef,
    public msg: MessagesService,
    public img: ImgCloudinaryService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  private getFromInput(value, target) {
    if (value) {
      target = value;
    }
  }

  public uploadFile(event: any) {
    const file = event.target.files[0];
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', this.CLOUDYNARY_URL, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const imgs = document.getElementsByTagName('img');
        for (let i = 0; i < imgs.length; i++) {
          const img = imgs[i];
          if (img.id === 'img-preview') {
            this.image = response.secure_url;
            img.src = response.secure_url;
            img.alt = response.public_id;
          }
        }
      }
    };

    fd.append('upload_preset', this.CLOUDYNARY_UPLOAD_PRESET);
    fd.append('file', file);
    xhr.send(fd);
  }

  private removeWarnings() {
    this.msg.messages.subscribe(data => {
      let flag = true;
      for (const id in data['warning']) {
        if (flag === true) {
          flag = false;
        } else {
          this.msg.remove(id);
        }
      }
    });
  }
  private removeSuccess() {
    this.msg.messages.subscribe(data => {
      let flag = true;
      for (const id in data['success']) {
        if (flag === true) {
          flag = false;
        } else {
          this.msg.remove(id);
        }
      }
    });
  }
  private removeAllWarnings() {
    this.msg.messages.subscribe(data => {
      for (const id in data['warning']) {
        this.msg.remove(id);
      }
    });
  }

  public update() {
    // this.parseTags();
    const project = {
      title: this.projectName,
      description: this.description,
      body: this.body,
      image: this.image,
      goal: this.goal,
      date: this.deadline,
      tags: this.tags
    };

    this.http
      .post('/api/project/' + this.pageId + '/update', project)
      .map(data => JSON.stringify(data))
      .subscribe(
      data => {
        this.router.navigate(['/project/' + this.pageId]); 
      },
      err => {
        this.removeSuccess();
        this.removeWarnings();
        if (err.error instanceof Error) {
          this.msg.warning('An error occured, please, try again.');
        } else {
          if (err.status === 200) {
            this.removeAllWarnings();
            window.scrollTo(0, 0);
            this.router.navigate(['/project/' + this.pageId]);   
          }
        }
      });
  }

  public items: any[];
  public validators = [this.addTag];

  public tagsPreview: any[] = [];

  public onAdd(event: any) {
    this.tagsPreview.push(event.value);
  }

  public errorMessages = {
    'addTag': 'Your tag can have max 25 symbols',
  };

  public addTag(control: FormControl) {
    if (control.value.length > 25) {
      return {
        'addTag': true
      };
    }
    return null;
  }

  public parseTags() {
    this.items.map(item => {
      this.tags.push(item.value);
    })
  }

  async ngOnInit() {
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
    this.route.params.subscribe(params => {
      this.pageId = params.pageId;
      this.http
        .get('/api/project/' + this.pageId)
        .map(data => JSON.stringify(data))
        .subscribe(
        async data => {
          this.project = await JSON.parse(data);
          this.tags = JSON.parse(data).tags;

          this.projectName = this.project.title;
          this.description = this.project.description;
          this.body = this.project.body;
          this.image = this.project.image;
          this.goal = this.project.goal;
          this.deadline = this.project.date;
        })
    });


  }

}
