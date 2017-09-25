import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() time: string;
  @Input() user: string = 'default user';
  @Input() content: string = 'Some hell is going on here';
  @Input() number: string;

  constructor() { }

  ngOnInit() {
  }

}
