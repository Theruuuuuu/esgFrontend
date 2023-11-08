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

  Logout(){
    this.cookie.delete('isLogin');
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      window.location.href = '/';
    }, 1000);
    
  }
}
