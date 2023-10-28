import { respones } from './../Model/Model';
import { Component } from '@angular/core';
import { HttpserviceService } from '../services/httpservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class registerComponent {
  // 组件的代码
  emailModel:any={}
  respones:any={}
  constructor(private http:HttpserviceService){}
  submit(email:string, p1:string, p2:string){
    if(p1 != p2){
      Swal.fire('錯誤', '密碼不一致', 'error');
    }else{
      this.emailModel={
        account:email,
        password:p1
      }
      this.http.Create(this.emailModel).subscribe(
        u=>{
          this.respones = u.body;
          Swal.fire('成功', this.respones.message, 'success').then(()=>
          {
            window.location.href = '/';
          })
        },
        err=>{
          this.respones = err.error;
          Swal.fire('失敗', this.respones.message, 'error');
        }
      )
    }
  }
}
