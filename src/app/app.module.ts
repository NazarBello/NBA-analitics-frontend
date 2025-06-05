import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';



// Create an auth interceptor to add the token to requests


@NgModule({
  declarations: [

    // Note: Don't declare standalone components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppComponent
  ],
  providers: [
  ],
  bootstrap: []
})
export class AppModule { }
