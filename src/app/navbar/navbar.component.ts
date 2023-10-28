import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  User:any='還沒帳號';
  isLogin = false;
  constructor(private cookie:CookieService){}
  ngOnInit():void{
    if(this.cookie.check('isLogin')){
      this.User = this.cookie.get('id');
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  DelCookie(){
    if(this.cookie.check('id')){
      this.cookie.delete('id');
    }
  }

  Logout(){
    this.cookie.delete('isLogin');
    window.location.href = '/';
  }
}
