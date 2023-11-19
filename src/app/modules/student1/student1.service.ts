import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './model/user.model';
import { Company } from '../student3/model/company.model';
import { Equipment } from '../student3/model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class Student1Service {

  constructor(private http: HttpClient) { }


  addUser(user : User): Observable<User>{
    return this.http.post<User>('http://localhost:8080/api/users', user);
  }
  
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('http://localhost:8080/api/companies/all');
  }

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>('http://localhost:8080/api/equipments/all');
  }

  

}
