import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { EsgDataComponent } from './esg-data/esg-data.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserComponent } from './user/user.component';



Chart.register(...registerables);


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent,
    EsgDataComponent,
    ResetPasswordComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
