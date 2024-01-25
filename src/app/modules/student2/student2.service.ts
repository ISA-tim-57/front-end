import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicUser } from 'src/app/model/basic-user.model';
import { Company } from 'src/app/model/company.model';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class Student2Service {

  constructor(private http: HttpClient) { }

  getUser(id: number) : Observable<User>{
    return this.http.get<User>('http://localhost:8080/api/users/'+ id);
  }

  getCompany(id : number) : Observable<Company>{
    return this.http.get<Company>('http://localhost:8080/api/companies/'+ id);
  }
  
  getAllCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>('http://localhost:8080/api/companies/all');
  }

  getBasicUser(id : number): Observable<BasicUser>{
    return this.http.get<BasicUser>('http://localhost:8080/api/users/basicuser/'+ id)
  }

}
