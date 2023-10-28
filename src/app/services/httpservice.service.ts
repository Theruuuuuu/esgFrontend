import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { accountModel } from '../Model/Model';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http:HttpClient) { }

  Create(Model:any){
    return this.http.post('https://esgprojapi.azurewebsites.net/api/Account/create',Model,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }), observe: 'response'
    })
  }

  Login(Model:accountModel){
    return this.http.post('https://esgprojapi.azurewebsites.net/api/Account/login', Model,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }), observe: 'response'
      });
  }
  
  Forgot(email:string){
    return this.http.post('https://esgprojapi.azurewebsites.net/api/Account/forgotPassword',null,
    {observe: 'response', params:new HttpParams().set('email',email)});
  }

  //不知為啥get 用 HttpParams沒用
  ForgotGet(token:string, email:string){
    return this.http.get(`https://esgprojapi.azurewebsites.net/api/Account/resetPassword?token=${token}&email=${email}`);
  }

  ResetPassword(Model:any){
    return  this.http.post('https://esgprojapi.azurewebsites.net/api/Account/resetPassword',Model,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }), observe: 'response'
    });
  }
}
