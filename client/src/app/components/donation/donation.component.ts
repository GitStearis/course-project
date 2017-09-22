import { Component, OnInit } from '@angular/core';
import { NotfoundComponent } from '../notfound/notfound.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from '../../../../node_modules/ng2-messages/ng2-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  pageId: string = '';
  value: number = 0;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private http: HttpClient,
    private location: Location,
    public msg: MessagesService,
    private router: Router
  ) { }

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

  public back() {
    this.location.back();
  }
  public continue() {
    this.http
      .get('/api/project/' + this.pageId + '/donate/' + localStorage['name'] + '/' + this.value)
      .map(data => JSON.stringify(data))
      .subscribe(
      data => {
        this.msg.success('Successfully donated' + this.value + ' $');
        console.log(data);
      },
      err => {
        this.removeWarnings();
        if (err.error instanceof Error) {
          this.msg.warning('An error occured, please, try again.');
          console.log('An error occurred:', err.error.message);
        }
        if (err.status === 200) {
          this.msg.success('Successfully donated ' + this.value + ' $');
          this.router.navigate(['/project/' + this.pageId]);
        } else {
          this.msg.warning('Server returned code ' + err.status + ', ' + err.error);
        }
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageId = params.pageId;
      console.log(params);
    });
  }

}
