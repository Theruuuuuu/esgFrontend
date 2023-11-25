import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../services/httpservice.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  userInfo:any=[];
  followingList:any=[];
  uid:any;

  isFollow:boolean=true;

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
          this.isFollow = false
          console.log(err.error)
        }
      )
  }

  forgot(){

    this.http.Forgot(this.userInfo.email).subscribe(
      u=>{
        Swal.fire('成功', `修改密碼請至:${this.userInfo.email} 查看信件`, 'success')
      },
      err=>{
        Swal.fire('失敗', `找不到帳號:${this.userInfo.email}`, 'error');
      }      
    );    
  }
}
