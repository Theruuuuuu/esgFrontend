import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { HttpserviceService } from '../services/httpservice.service';
import { Company } from '../Model/Model';

@Component({
  selector: 'app-esg-data',
  templateUrl: './esg-data.component.html',
  styleUrls: ['./esg-data.component.scss']
})
export class EsgDataComponent implements OnInit {
  items:Company = {
    id: 0,
    companyNumber: '-',
    companyName: '-',
    susESG: '-',
    msciESG: '-',
    ftseESG: '-',
    issESG: '-',
    sapESG: '-',
    twCompanyRank: '-',
    refi: '-'
  }
  rankItem:any={}
  CompanyNews:any={}
  CompanyInfo:any={
    companyName:'-',
    industry:'-',
    description:'-',
    chairman:'-',
    establishmentDay:'-',
    link:'-'
  }
  id:string='' //公司ID

  //各項ESG資料
  msci:any={}
  refinitiv:any={}
  SAP:any={}
  sustainalytics:any={}


  //圖表參數
  myChart:any
  config:any;
  data:any;
  options:any;
  
  esgNum:any={};
  esgName:any=['sustainalytics', 'MSCI', 'FTSE Russell', 'ISS', 'S&P Global', '台灣公司治理評鑑', 'Refinitiv (Asset4)'];
  esgValue:any=[];
  esgAverageValue:any=[];

  //是否加入最愛清單
  isFollowing:boolean=false;
  email:any;
  uid:any;

  constructor(private route:ActivatedRoute, private http:HttpClient, private cookie:CookieService, private accountHttp:HttpserviceService){}
  ngOnInit(): void {
    //Header用意是告訴API你船的資料類別(json、text),或者是給他驗證的TOKEN(Anthorization)
    // this.http.get('https://esgprojapi.azurewebsites.net/api/Account',
    // {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe(u=>
    //   console.log(u))   

    this.email = this.cookie.get('id');
    this.uid = this.cookie.get('uid');
    console.log(this.uid)

    this.route.params.subscribe(parms=>
      this.id=parms['id']
    );
    this.http.get<Company>('https://esgprojapi.azurewebsites.net/api/Content/'+this.id).subscribe(
      u=>{
        this.items = u;

        //公司基本資料
        this.http.get('https://esgprojapi.azurewebsites.net/api/Content/CompanyInfo/'+ this.items.companyNumber).subscribe(
          u=>{
            this.CompanyInfo = u
          }
        )

        //各項ESG資料
        this.http.get('https://esgprojapi.azurewebsites.net/api/Content/MSCI/'+ this.items.companyNumber).subscribe(
          u=>{
            this.msci = u
          }
        )
        this.http.get('https://esgprojapi.azurewebsites.net/api/Content/Refinitiv/'+ this.items.companyNumber).subscribe(
          u=>{
            this.refinitiv = u
          }
        )
        this.http.get('https://esgprojapi.azurewebsites.net/api/Content/SAP/'+ this.items.companyNumber).subscribe(
          u=>{
            this.SAP = u
          }
        )
        this.http.get('https://esgprojapi.azurewebsites.net/api/Content/Sustainalytics/'+ this.items.companyNumber).subscribe(
          u=>{
            this.sustainalytics = u
          }
        )
      });
    this.http.get('https://esgprojapi.azurewebsites.net/api/Content/rank/'+this.id).subscribe(
      u=>{
        this.rankItem = u;
      }
    )
    
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

    //取得追蹤按鈕控制
    this.accountHttp.CheckFollowingList(this.uid, this.id).subscribe(
      u=>{
        this.isFollowing = true
        console.log('123')
      },
      err=>{
        this.isFollowing = false
      }
    )

    // 取得新聞
    this.http.get('https://esgprojapi.azurewebsites.net/api/Content/News/'+this.id).subscribe(
      u=>{
        console.log(u)
        this.CompanyNews = u
      }
    )

    
  }

  following(){
    if(this.isFollowing == false){
      console.log('false!')
      this.accountHttp.AddFollowingList(this.uid, this.id).subscribe(
        u=>{
          this.isFollowing = true
        },
        err=>{
          console.log(err.error)
        }
      )
    }else{
      this.accountHttp.DeleteFollowingList(this.uid, this.id).subscribe(
        u=>{
          this.isFollowing = false
        },
        err=>{
          console.log(err.error)
        }
      )
    }
    
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
        borderWidth: 4
      },
      {
        label: '平均',
        data: this.esgAverageValue,
        borderWidth: 2,
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
              max:100,
              grid:{
                color:'#afdbbb'
              },
              ticks:{
                display:false
              },
              pointLabels:{
                color:'#fcfcfc',
                font:{
                  size:15,
                }
              }
            }
          },
          elements: {
            point: {
              radius: 0, // 結果的角度圓點大小
            },
            line: {
              borderWidth: 1, //結果線的寬度
            },
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
