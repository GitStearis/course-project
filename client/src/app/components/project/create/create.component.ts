import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../../../profile';
import { AuthService } from '../../../services/auth/auth.service';
import { MessagesService } from '../../../../../node_modules/ng2-messages/ng2-messages.service';
import { ImgCloudinaryService } from '../../../services/img/img-cloudinary.service';
import { Router } from '@angular/router';
import { async } from 'q';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  CLOUDYNARY_URL = 'https://api.cloudinary.com/v1_1/itra-courseproject/image/upload';
  CLOUDYNARY_UPLOAD_PRESET = 'nw6hxewv';

  public projectName: string = '';
  public description: string = '';
  public body: string = '';
  public image: string = '';
  public goal: string = '';
  public deadline: string = '';
  public creation: string = new Date().toJSON().slice(0, 10);
  public tags: string = '';
  public author: string = localStorage['name'];

  public tagList: string[] = [];

  public query = '';
  public countries = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus',
    'Belgium', 'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus',
    'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia',
    'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo',
    'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta',
    'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland',
    'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia',
    'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];
  public filteredList = [];
  public selected = [];
  public elementRef;

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    public element: ElementRef,
    public msg: MessagesService,
    public img: ImgCloudinaryService,
    private router: Router
  ) {
    this.elementRef = element;
  }

  public filter() {
    if (this.query !== '') {
      this.filteredList = this.countries.filter(
        function (el) {
          return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this)
      );
    } else {
      this.filteredList = [];
    }
  }

  public select(item) {
    this.selected.push(item);
    this.query = '';
    this.filteredList = [];
  }

  public remove(item) {
    this.selected.splice(this.selected.indexOf(item), 1);
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }

  private getFromInput(value, target) {
    if (value) {
      target = value;
    }
  }

  public uploadFile(event: any) {
    const file = event.target.files[0];
    // let imgUploaded = this.img.uploadFile(file);

    // let imgs = document.getElementsByTagName('img');
    // for (let i = 0; i < imgs.length; i++){
    //   let img = imgs[i];
    //   if (img.id === 'img-preview'){
    //     this.image = imgUploaded.src;
    //     img.src = imgUploaded.src;
    //     img.alt = imgUploaded.alt;
    //   }
    // }
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', this.CLOUDYNARY_URL, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText));
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
  private removeAllWarnings() {
    this.msg.messages.subscribe(data => {
      for (const id in data['warning']) {
        this.msg.remove(id);
      }
    });
  }

  public submit() {
    const project = {
      title: this.projectName,
      description: this.description,
      body: this.body,
      image: this.image,
      goal: this.goal,
      date: this.deadline,
      tags: this.tags,
      author: localStorage['name']
    };

    this.http
      .post('/api/project/new', project)
      .map(data => JSON.stringify(data))
      .subscribe(
      data => {
        this.removeAllWarnings();
        window.scrollTo(0, 0);
        this.msg.success('Successfully created project!');
        this.router.navigate(['/']);
        console.log(data);
      },
      err => {
        this.removeWarnings();
        window.scrollTo(0, 0);
        if (err.error instanceof Error) {
          this.msg.warning('An error occured, please, try again.');
          console.log('An error occurred:', err.error.message);
        } else {
          this.msg.warning('Server returned code ' + err.status + ', ' + err.error);
          console.log(err);
          console.log(
            `Backend returned code ${err.status}, body was: ${err.error}`
          );
        }
      }
      );
  }

  ngOnInit() { }
}
