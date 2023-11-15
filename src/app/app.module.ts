import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './modules/student1/demo/demo.component';
import { LayoutModule } from './layout/layout.module'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { Student3Module } from './modules/student3/student3.module';



@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    Student3Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
