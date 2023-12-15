import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone : true,
  imports : [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private service : AuthService){}

  loginForm = new FormGroup({
    username : new FormControl("",[Validators.required]),
    password : new FormControl("",[Validators.required])
  })


  logIn(){
    this.service.logIn(this.loginForm.value.username || "",this.loginForm.value.password || "")
  }

  getToken(){
    console.log(localStorage.getItem('jwt'))
  }

  logout(){
    this.service.logout();
  }

  setUser(){
    this.service.setUser();
  }

  


}
