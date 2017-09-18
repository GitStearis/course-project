import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() time: Date;
  @Input() user: string = 'default user';
  @Input() content: string = 'Some hell is going on here';

  constructor() { }

  ngOnInit() {
  }

}
