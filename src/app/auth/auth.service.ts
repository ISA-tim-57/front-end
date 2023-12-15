import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtToken, createEmptyJwtToken } from './model/token.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../modules/student3/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }


  logIn(un : string, pw : string){
    const credentials = {username : un, password : pw}
    return this.http.post<JwtToken>('http://localhost:8080/api/auth/authenticate', credentials).subscribe({
      next : (res : JwtToken) =>{
        localStorage.setItem("jwt",res.accessToken);
        console.log("Uspesno prijavljen")
      }
    })
  }

  logout() {
    //this.userService.currentUser = null;
    localStorage.removeItem("jwt");
    //this.router.navigate(['/login']);
    console.log("Izlogovan")
  }

  setUser() : void{
    // const jwtHelperService = new JwtHelperService();
    // const accessToken = localStorage.getItem('jwt') || "";
    // console.log(jwtHelperService.decodeToken(accessToken))
    this.http.get<User>('http://localhost:8080/api/users/whoami').subscribe({
      next : (res)=>{
        console.log(res);
      }
    })
  }


}
