import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../modules/student3/model/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const storedUserJson = localStorage.getItem('user');
        
    const user: User | null = storedUserJson ? JSON.parse(storedUserJson) : null;
    if (user === null) {
      this.router.navigate(['login']);
      return false;
    }
    if(user.role !== 'ROLE_USER'){
        this.router.navigate(['error']);
        return false;
    }
    return true;
  }
}
