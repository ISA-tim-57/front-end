import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';

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

  user: User | null = this.authService.getUser();

  isLoggedIn(){
    let user : User | null = this.authService.getUser();
    if(user === null){
      return false;
    }
    else{
      return true;
    }
  }

  isCompanyAdmin() : boolean{
    let user : User | null = this.authService.getUser();
    if (user === null) {
      return false;
    }
    if(user.role !== 'ROLE_COMPANYADMIN'){
        return false;
    }
    return true;
  }

  isUser() : boolean{
    let user : User | null = this.authService.getUser();
    if (user === null) {
      return false;
    }
    if(user.role !== 'ROLE_USER'){
        return false;
    }
    return true;
  }

  isSystemAdmin() : boolean{
    let user : User | null = this.authService.getUser();
    if (user === null) {
      return false;
    }
    if(user.role !== 'ROLE_SYSTEMADMIN'){
        return false;
    }
    return true;
  }

  goToLogin(){
    this.isLoggedIn();
    this.isCompanyAdmin();
    this.isUser();
    this.isSystemAdmin();
    this.router.navigate(['login']);
  }

  logOut(){
    this.authService.logout();
    this.isCompanyAdmin();
    this.isUser();
    this.isSystemAdmin();
    this.router.navigate(['login']);
  }

  goToCompanyAdminProfile(){
    this.router.navigate(['administratorprofile']);
  }

  goToHomepage(){
    this.router.navigate(['']);
  }

  goToCompanyEquipments(){
    this.router.navigate(['company-equipments']);
  }

  goToCreateAppointment(){
    this.router.navigate(['create-appointment']);
  }

  goToDelivery(){
    this.router.navigate(['delivery']);
  }

  goToCustomers(){
    this.router.navigate(['customers'])
  }

}
