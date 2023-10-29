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
  ngOnInit(): void {
  }
  Dokeyup(data: string) {
    if (data !== '') {
      if (data.length > 5) {
        // 如果输入字符数超过五个，截断字符串为前五个字符
        data = data.slice(0, 5);
      }
  
      this.http.get('https://esgprojapi.azurewebsites.net/api/Content/search?search=' + data).subscribe(u => {
        console.log(u);
  
        // 检查响应数据是否是数组
        if (Array.isArray(u)) {
          // 截取返回结果的前五项
          this.getJsonData = u.slice(0, 5);
        } else {
          // 响应数据不是数组，可能需要其他处理
          // 在这里，您可以根据响应数据的类型执行适当的操作
          console.error('响应数据不是数组');
        }
      });
    } else {
      this.getJsonData = null;
    }
  }
  
  
}
