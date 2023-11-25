import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { first, map, switchMap, take } from 'rxjs';
import { Company, CompanyList } from '../Model/Model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  getJsonData:Company[]=[];
  inputValue:string='';
  constructor(private http:HttpClient) {}
  ngOnInit(): void {

  }
  Dokeyup() {
    if(this.inputValue != ''){
      this.http.get<Company[]>('https://esgprojapi.azurewebsites.net/api/Content/search?search=' + this.inputValue).pipe(map(arr=>arr.slice(0,5))).subscribe(u => {
        this.getJsonData = u;
      });
    }else{
      this.getJsonData = [];
    }  
  }
  
}
