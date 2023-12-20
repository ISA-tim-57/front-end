import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/modules/student3/model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router : Router,
    private authService : AuthService,
  ){}

  isLoggedIn(){
    let user : User | null = this.authService.getUser();
    if(user === null){
      return false;
    }
    else{
      return true;
    }
  }

  goToLogin(){
    this.isLoggedIn()
    this.router.navigate(['login']);
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
