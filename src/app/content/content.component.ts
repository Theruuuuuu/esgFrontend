import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  getJsonData:any;
  constructor(private http:HttpClient) {}
  ngOnInit(): void {}
  Dokeyup(data:string){
    if(data!=''){
      this.http.get('https://esgprojapi.azurewebsites.net/api/Content/search?search='+data).subscribe(u=>{
        console.log(u);
        this.getJsonData=u;
      });
    }else{
      this.getJsonData = null;
    }
    
  }
  
}
