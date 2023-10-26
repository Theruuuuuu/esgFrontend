import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-esg-data',
  templateUrl: './esg-data.component.html',
  styleUrls: ['./esg-data.component.scss']
})
export class EsgDataComponent implements OnInit {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ6eGMzMzA5NjM0MjU2QGdtYWlsLmNvbSIsIm5iZiI6MTY5ODAzMzU3OCwiZXhwIjoxNjk4MDM1Mzc4LCJpYXQiOjE2OTgwMzM1Nzh9.3axXQyy5gqpqxMzAQLEthzuZ9pTcmH8hUYI2Syq0Is4';
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    //Header用意是告訴API你船的資料類別(json、text),或者是給他驗證的TOKEN(Anthorization)
    this.http.get('https://esgprojapi.azurewebsites.net/api/Account',
    {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe(u=>
      console.log(u))    
  }

}
