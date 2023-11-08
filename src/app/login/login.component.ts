import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { accountModel, respones } from '../Model/Model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnInit {
  respones: any={};
  accountModel!:accountModel
  account: any;
  //遮罩參數
  isBlock:string='visibility:hidden';

  constructor(private cookie: CookieService, private http:HttpserviceService) { }
  ngOnInit(): void {
    if (this.cookie.check('id')) {
      this.account = this.cookie.get('id');
    } else {
      this.account = '';
    }
  }
  Submit(d1: string, d2: string) {
    this.isBlock='';

    if(d1=='' || d2=='')
    {
      return;
    }
    this.accountModel = {
      account:d1,
      password:d2
    }
    
      this.http.Login(this.accountModel).subscribe(
      u => {
        this.respones = u.body; 
        this.isBlock = 'visibility:hidden';
        this.respones = this.respones.data               
        Swal.fire('成功', '登入成功', 'success').then(()=>{          
          this.addCookie()
        });        
      },
      err => {
        this.respones = err.error;   
        this.isBlock = 'visibility:hidden';   
        Swal.fire('失敗', '登入失敗', 'error');
      }
      
    )
  }

  print(){
    console.log(this.respones);
  }

  addCookie() {
    this.cookie.set('uid', this.respones.uid)
    this.cookie.set('id', this.respones.email)
    this.cookie.set('isLogin','')
    //原始刷新方法
    window.location.href = '/';


  }

  forgot(email:string){

    this.http.Forgot(email).subscribe(
      u=>{
        Swal.fire('成功', `修改密碼請至:${email} 查看信件`, 'success')
      },
      err=>{
        Swal.fire('失敗', `找不到帳號:${email}`, 'error');
      }      
    );    
  }
}
