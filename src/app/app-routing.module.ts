import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { ContentComponent } from './content/content.component';
import { loginComponent } from './login/login.component';
import { registerComponent } from './register/register.component';
import { EsgDataComponent } from './esg-data/esg-data.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



const routes: Routes = [
  
  {path:'', component: ContentComponent},
  {path:'data/:id', component: EsgDataComponent},
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
  { path: 'login', component: loginComponent }, // 添加新的 "login" 路由
  { path: 'register', component: registerComponent },
  { path: 'resetPassword/:token/:email', component: ResetPasswordComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
