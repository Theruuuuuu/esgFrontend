import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../services/httpservice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  userInfo:any={};
  followingList:any={};
  uid:any;

  constructor(private http:HttpserviceService, private cookie:CookieService){}
  ngOnInit(): void {
      this.uid = this.cookie.get('uid');
      this.http.GetUser(this.cookie.get('id')).subscribe(
        u=>{
          this.userInfo = u;
          console.log(u);
        }
      )
      this.http.GetFollowingList(this.uid).subscribe(
        u=>{
          this.followingList = u.body
          console.log(u.body)
          this.followingList = this.followingList.data
        },
        err=>{
          console.log(err.error)
        }
      )
      
  }
}
