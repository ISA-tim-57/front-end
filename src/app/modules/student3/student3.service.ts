import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './model/company.model';
import { Equipment } from './model/equipment.model';
import { Appointment } from './model/appointment.model';
import { User } from './model/user.model';

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

  addEquipmentToCompany(equipment : Equipment): Observable<Equipment>{
    return this.http.post<Equipment>('http://localhost:8080/api/equipments', equipment);
  }

  addAppointmentToCompany(appointment : Appointment) : Observable<Appointment>{
    return this.http.post<Appointment>('http://localhost:8080/api/appointments', appointment);
  }

  updateCompany(id : number, updatedCompany : Company) : Observable<Company>{
    return this.http.put<Company>('http://localhost:8080/api/companies/' + id, updatedCompany);
  }

  getUser(id : number) : Observable<User> {
    return this.http.get<User>("http://localhost:8080/api/users/" + id);
  }

  changePassword(id : number, oldPassword : string, newPassword : string) : Observable<number>{
    const changePasswordRequest = {oldPassword : oldPassword, newPassword : newPassword}
    return this.http.put<number>("http://localhost:8080/api/users/changepassword/" + id, changePasswordRequest);
  }

  updateCompanyAdmin(id : number, updatedCompanyAdmin : User) : Observable<User>{
    return this.http.put<User>("http://localhost:8080/api/users/updatecompanyadmin/" + id,updatedCompanyAdmin);
  }

  updateEquipment(id : number, updatedEquipment : Equipment) : Observable<Equipment>{
    return this.http.put<Equipment>("http://localhost:8080/api/equipments/" + id, updatedEquipment)
  }

  deleteEquipment(id : number) : Observable<void>{
    return this.http.delete<void>("http://localhost:8080/api/equipments/" + id);
  }

  searchEquipment(namePart : string) : Observable<Equipment[]>{
    return this.http.get<Equipment[]>("http://localhost:8080/api/equipments/search/" + namePart);
  }

  
}
