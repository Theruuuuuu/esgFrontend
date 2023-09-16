import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { PostComponent } from './post/post.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'Index';
  fromChildOutput!:string;
  userName?:string;
  bool:boolean=true;
  parentMessage:string = 'appContextIsWork!!'
  message?:string
  @ViewChild(PostComponent) postComponent!: PostComponent;

  ngAfterViewInit(): void {

  }
  reciveMessage($event: any){
    console.log($event);
    this.fromChildOutput=$event;
  }
  Dokeyup(){
    this.message=this.userName;
  }
}
