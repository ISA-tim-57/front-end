import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user-profile.model';
import { Company } from '../student3/model/company.model';

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
}
