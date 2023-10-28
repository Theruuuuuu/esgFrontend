import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{
  id!:number;
  items:any = {};
  public getJsonValue:any;
  public postJsonValue:any;
  //圖表參數
  myChart:any
  config:any;
  data:any;
  options:any;

  constructor(private route:ActivatedRoute,private http:HttpClient){
    console.log(this.route.snapshot.params);
  }
  ngOnInit(): void {
    this.route.params.subscribe(parms=>
      this.id=parms['id']
    );
    this.http.get('https://esgprojapi.azurewebsites.net/api/Content/'+this.id).subscribe(u=>{
        console.log(u);
        this.items=u;
    });

    this.myChart=new Chart("myChart", this.getConfig('bar'));
  }

  getChart(types:any){
    console.log(types); 
    this.myChart.destroy();
    this.myChart = new Chart("myChart", this.getConfig(types));
  }

  getConfig(types:string){
    //圖表資料
    this.data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    }
    //圖表選項
    this.options = {
      scales: {
        y: {
          beginAtZero: true,
          min:0,
          max:100
        }
      }
    }
    if(types=='bar'){
      this.config={
        type:'bar',
        data:this.data,
        options:this.options            
      };
    }
    if(types=='radar'){
      this.config={
        type:'radar',
        data:this.data,
        options:this.options            
      }
    }
    if(types=='pie'){
      this.config={
        type:'pie',
        data:this.data,
        options:this.options            
      }
    }
    return this.config;
  }

}
