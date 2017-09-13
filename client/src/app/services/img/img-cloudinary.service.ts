import { Injectable } from '@angular/core';

@Injectable()
export class ImgCloudinaryService {

  CLOUDYNARY_URL: string = "https://api.cloudinary.com/v1_1/itra-courseproject/image/upload";
  CLOUDYNARY_UPLOAD_PRESET: string = "nw6hxewv";

  constructor() { }

  public uploadFile(file: any){
    // let file = event.target.files[0];
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    let image: any;
    xhr.open('POST', this.CLOUDYNARY_URL, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
        let response = JSON.parse(xhr.responseText);
        return image = {
          src: response.secure_url,
          alt: response.public_id
        }
      }
    };
  
    fd.append('upload_preset', this.CLOUDYNARY_UPLOAD_PRESET);
    fd.append('file', file);
    xhr.send(fd);
  }

}
