import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-esg-data',
  templateUrl: './esg-data.component.html',
  styleUrls: ['./esg-data.component.scss']
})
export class EsgDataComponent implements OnInit {
  items:any={}
  id:any
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ6eGMzMzA5NjM0MjU2QGdtYWlsLmNvbSIsIm5iZiI6MTY5ODAzMzU3OCwiZXhwIjoxNjk4MDM1Mzc4LCJpYXQiOjE2OTgwMzM1Nzh9.3axXQyy5gqpqxMzAQLEthzuZ9pTcmH8hUYI2Syq0Is4';
  //圖表參數
  myChart:any
  config:any;
  data:any;
  options:any;
  
  esgNum:any={};
  esgName:any=['sustainalytics', 'MSCI', 'FTSE Russell', 'ISS', 'S&P Global', '台灣公司治理評鑑', 'Refinitiv (Asset4)'];
  esgValue:any=[];
  esgAverageValue:any=[];

  constructor(private route:ActivatedRoute, private http:HttpClient, private cookie:CookieService){}
  ngOnInit(): void {
    //Header用意是告訴API你船的資料類別(json、text),或者是給他驗證的TOKEN(Anthorization)
    // this.http.get('https://esgprojapi.azurewebsites.net/api/Account',
    // {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe(u=>
    //   console.log(u))   

    this.route.params.subscribe(parms=>
      this.id=parms['id']
    );
    this.http.get('https://esgprojapi.azurewebsites.net/api/Content/'+this.id).subscribe(
      u=>{
        this.items = u;
      });
    this.http.get('https://esgprojapi.azurewebsites.net/api/Content/doNum/'+this.id).subscribe(
      u=>{
        //數值資料
        this.esgNum = u;
        this.esgValue.push(this.esgNum.susESG)
        this.esgValue.push(this.esgNum.msciESG)
        this.esgValue.push(this.esgNum.ftseESG)
        this.esgValue.push(this.esgNum.issESG)
        this.esgValue.push(this.esgNum.sapESG)
        this.esgValue.push(this.esgNum.twCompanyRank)
        this.esgValue.push(this.esgNum.refi)

        console.log(this.esgValue)
        //預設圖表 寫在裡面是因為等這支API跑完資料才做圖表
        //寫在外面會被偷跑
        if(this.cookie.check('isLogin')){
          this.http.get('https://esgprojapi.azurewebsites.net/api/Content/doNum').subscribe(
            u=>{
              this.esgNum = u;
              this.esgAverageValue.push(this.esgNum.susESG)
              this.esgAverageValue.push(this.esgNum.msciESG)
              this.esgAverageValue.push(this.esgNum.ftseESG)
              this.esgAverageValue.push(this.esgNum.issESG)
              this.esgAverageValue.push(this.esgNum.sapESG)
              this.esgAverageValue.push(this.esgNum.twCompanyRank)
              this.esgAverageValue.push(this.esgNum.refi)

              //登入會員後可以與平均比較
              this.myChart=new Chart("myChart", this.getConfig('radar'));
            }
          );
        }else{
          //沒有就直接叫
          this.myChart=new Chart("myChart", this.getConfig('radar'));
        }
      }
    );
  }

  getChart(types:any){
    this.myChart.destroy();
    this.myChart = new Chart("myChart", this.getConfig(types));
  }

  //Changing type
  getConfig(types:string){
    //圖表資料
    this.data = {
      labels: this.esgName,
      datasets: [{
        label: 'esgData',
        data: this.esgValue,
        borderWidth: 1
      },
      {
        label: '平均',
        data: this.esgAverageValue,
        borderWidth: 1
      }]
    }

    if(types=='bar'){
      this.config={
        type:'bar',
        data:this.data,
        options:{
          scales: {
            y: {
              beginAtZero: true,
              min:0,
              max:100
            }
          }
        }            
      };
    }
    if(types=='radar'){
      this.config={
        type:'radar',
        data:this.data,
        options:{
          scales: {
            r: {
              beginAtZero: true,
              min:0,
              max:100
            }
          }
        }            
      }
    }
    if(types=='pie'){
      this.config={
        type:'pie',
        data:this.data,
        options:{
          scales: {
            y: {
              beginAtZero: true,
              min:0,
              max:100
            }
          }
        }            
      }
    }
    return this.config;
  }

}
