import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtToken, createEmptyJwtToken } from './model/token.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, createEmptyUser } from '../modules/student3/model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private router : Router) { }


  logIn(un : string, pw : string){
    const credentials = {username : un, password : pw}
    return this.http.post<JwtToken>('http://localhost:8080/api/auth/authenticate', credentials).subscribe({
      next : (res : JwtToken) =>{
        localStorage.setItem("jwt",res.accessToken);
        console.log("Uspesno prijavljen")
        this.setUser()
        
      }
    })
  }

  logout() {
    //this.userService.currentUser = null;
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    //this.router.navigate(['/login']);
    console.log("Izlogovan")
  }

  setUser() : void{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
      // Add more headers as needed
    });
    const options = {headers : headers};
    this.http.get<User>('http://localhost:8080/api/users/whoami',options).subscribe({
      next : (res)=>{
        const userJson = JSON.stringify(res);
        localStorage.setItem('user', userJson);
        this.router.navigate([''])
      }
    })
  }

  getUser() : User | null{
    const storedUserJson = localStorage.getItem('user');
    const user: User | null = storedUserJson ? JSON.parse(storedUserJson) : null;
    return user;
  }


}
