import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { ContentComponent } from './content/content.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'', component: ContentComponent},
  // 巢狀router
  {path:'post', component:PostComponent,
  children:[
    {
      path:'', component:PostListComponent
    },
    {path:'test/:id', component:TestComponent}
  ]},
  {path:'post/:id', component:PostComponent,
  children:[
    {
      path:'',component:PostListComponent
    },
    {path:'test/:id', component:TestComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
