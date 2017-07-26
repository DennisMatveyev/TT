import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpModule }   from '@angular/http';
import {HomeGuard} from "./guards/home.guard";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ HomeGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
