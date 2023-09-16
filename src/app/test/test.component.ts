import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
  public disable=false;
  text='disable';
  esgId!:number;
  constructor(private activatedRoute:ActivatedRoute){
    console.log(this.activatedRoute.snapshot.params);
  }
  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>
        this.esgId=params['id']  
      );
  }
  DoClick(){
    if(this.disable==false){
      this.disable=true;
      this.text='true';
    }else{
      this.disable=false;
      this.text='false';
    }
  }
}
