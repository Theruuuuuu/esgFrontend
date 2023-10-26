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
  items:any;
  public getJsonValue:any;
  public postJsonValue:any;

  
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
  }

  getChart(types:string){
    var myChart=new Chart("myChart", {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  getradar(){
    var myChart=new Chart("myChart", {
      type: 'radar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  getdoughnut(){
    var myChart=new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
