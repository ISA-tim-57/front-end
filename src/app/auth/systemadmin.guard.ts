import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root',
})
export class SystemAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService : AuthService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const storedUserJson = localStorage.getItem('user');
        
    const user: User | null = this.authService.getUser();
    if (user === null) {
      this.router.navigate(['login']);
      return false;
    }
    if(user.role !== 'ROLE_SYSTEMADMIN'){
        this.router.navigate(['error']);
        return false;
    }
    return true;
  }
}
