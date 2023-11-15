import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './model/company.model';
import { Equipment } from './model/equipment.model';
import { Appointment } from './model/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class Student3Service {

  constructor(private http : HttpClient) { }

  getDemoResponse(): Observable<string>{
    return this.http.get<string>( 'https://localhost:8080/api/demo');
  }

  getCompany(id : number) : Observable<Company>{
    return this.http.get<Company>('http://localhost:8080/api/companies/'+ id);
  }

  getEquipmentsForCompany(copmanyId : number): Observable<Equipment[]>{
    return this.http.get<Equipment[]>('http://localhost:8080/api/companies/'+ copmanyId + '/equipments');
  }

  getAppointmentsForCompany(copmanyId : number): Observable<Appointment[]>{
    return this.http.get<Appointment[]>('http://localhost:8080/api/companies/'+ copmanyId + '/appointments');
  }
}
