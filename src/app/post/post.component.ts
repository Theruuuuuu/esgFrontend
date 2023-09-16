import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  title='postWork!';
  
  @Input() parentMessage!: string;
  postMessage:string='postMessageeeeee';
  outputChildMessage:string = 'Message from postComponent';
  @Output() messageEvent = new EventEmitter<string>();


  constructor() { }
  ngOnInit(): void {
      console.log(this.parentMessage);
  }
  sendMessage(){
    this.messageEvent.emit(this.outputChildMessage);
    
  }
}
