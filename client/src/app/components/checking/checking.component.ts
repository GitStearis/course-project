import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../../profile';
import { AuthService } from '../../services/auth/auth.service';
import { MessagesService } from '../../../../node_modules/ng2-messages/ng2-messages.service';
import { ImgCloudinaryService } from '../../services/img/img-cloudinary.service';
import { Router } from '@angular/router';
import { async } from 'q';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css']
})
export class CheckingComponent implements OnInit {
  CLOUDYNARY_URL = 'https://api.cloudinary.com/v1_1/itra-courseproject/image/upload';
  CLOUDYNARY_UPLOAD_PRESET = 'nw6hxewv';

  public image: string = "http://imperva.typepad.com/.a/6a01156f8c7ad8970c0167683052d1970b-pi";

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    public element: ElementRef,
    public msg: MessagesService,
    public img: ImgCloudinaryService,
    private router: Router
  ) {
    // this.elementRef = element;
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

  public submit() {
    let submittingData = {
      image: this.image,
      person: localStorage.getItem('email')
    };

    this.http
      .post('/api/check', submittingData)
      .subscribe(
      data => {
        this.auth.removeAllWarnings();
        window.scrollTo(0, 0);
        this.msg.success('Wait for admin checking.');
        this.router.navigate(['/']);
      },
      err => {
        this.auth.removeWarnings();
        window.scrollTo(0, 0);
        if (err.error instanceof Error) {
          this.msg.warning('An error occured, please, try again.');
        } else {
          this.msg.warning('Server returned code ' + err.status + ', ' + err.error);
        }
      }
      );
  }

  ngOnInit() {
  }

}
