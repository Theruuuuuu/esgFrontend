import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { ContentComponent } from './content/content.component';
import { loginComponent } from './login/login.component';
import { registerComponent } from './register/register.component';
import { EsgDataComponent } from './esg-data/esg-data.component';



const routes: Routes = [
  
  {path:'', component: ContentComponent},
  {path:'test', component: EsgDataComponent},
  // 巢狀router
  {path:'post', component:PostComponent,
  children:[
    {
      path:'', component:PostListComponent
    },

  ]},
  {path:'post/:id', component:PostComponent,
  children:[
    {
      path:'',component:PostListComponent
    },

  ]},
  { path: 'new-login', component: loginComponent }, // 添加新的 "login" 路由
  { path: 'register', component: registerComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
