import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{

  token:any;
  email:any;

  resetPasswordModel:any={};

  constructor(private route:ActivatedRoute, private http:HttpserviceService){

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      u=>{
        this.token = u['token'];
        this.email = u['email'];
      }
    );

    this.http.ForgotGet(this.token, this.email).subscribe(
      u=>{
        this.resetPasswordModel = u;
        this.resetPasswordModel = this.resetPasswordModel.data;
        console.log(this.resetPasswordModel)
      }
    )

  }

  submit(password:string){
    this.resetPasswordModel={
      password:password,
      comfirmPassword:password,
      email:this.resetPasswordModel.email,
      token:this.resetPasswordModel.token  
    };
    
    this.http.ResetPassword(this.resetPasswordModel).subscribe(
      u=>{
        Swal.fire('成功', '成功更改密碼!!!', 'success').then(()=>
        {
          window.location.href = '/';
        })
      },
      er=>{
        Swal.fire('失敗', '更改失敗', 'error');
      }
    )
    console.log(this.resetPasswordModel);
  }

}
