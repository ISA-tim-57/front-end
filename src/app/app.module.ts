import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './modules/student1/demo/demo.component';
import { LayoutModule } from './layout/layout.module'
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { Student3Module } from './modules/student3/student3.module';

import { Student2Module } from './modules/student2/student2.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { AuthModule } from './auth/auth.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


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
    AuthModule,
    FormsModule,
    Student3Module,
    Student2Module,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
