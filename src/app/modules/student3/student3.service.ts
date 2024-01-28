import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company.model';
import { Equipment } from 'src/app/model/equipment.model';
import { Appointment } from 'src/app/model/appointment.model';
import { CompanyAdmin } from 'src/app/model/company-admin.model';
import { User } from 'src/app/model/user.model';
import { PurchaseOrder } from 'src/app/model/purchase-order.model';
import { EmailRequest } from 'src/app/model/email-request.model';


@Injectable({
  providedIn: 'root'
})
export class Student3Service {

  constructor(private http : HttpClient) { }

  getDemoResponse(): Observable<string>{
    return this.http.get<string>( 'https://localhost:8080/api/demo');
  }

  getCompany(id : number) : Observable<Company>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.get<Company>('http://localhost:8080/api/companies/'+ id, options);
  }

  getEquipmentsForCompany(copmanyId : number): Observable<Equipment[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.get<Equipment[]>('http://localhost:8080/api/companies/'+ copmanyId + '/equipments',options);
  }

  getAppointmentsForCompany(copmanyId : number): Observable<Appointment[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.get<Appointment[]>('http://localhost:8080/api/companies/'+ copmanyId + '/appointments', options);
  }

  getCompanyAdmins(companyId : number) : Observable<CompanyAdmin[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.get<CompanyAdmin[]>('http://localhost:8080/api/companies/'+ companyId + '/admins', options);

  }

  addEquipmentToCompany(equipment : Equipment): Observable<Equipment>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.post<Equipment>('http://localhost:8080/api/equipments', equipment, options);
  }

  addAppointmentToCompany(appointment : Appointment) : Observable<Appointment>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
      // Add more headers as needed
    });
    const options = {headers : headers};
    return this.http.post<Appointment>('http://localhost:8080/api/appointments', appointment, options);
  }

  updateCompany(id : number, updatedCompany : Company) : Observable<Company>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
      // Add more headers as needed
    });
    const options = {headers : headers};
    return this.http.put<Company>('http://localhost:8080/api/companies/' + id, updatedCompany, options);
  }

  getUser(id : number) : Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.get<User>("http://localhost:8080/api/users/" + id, options);
  }

  getCompanyAdmin(id : number) : Observable<CompanyAdmin> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.get<CompanyAdmin>("http://localhost:8080/api/users/companyadmin/" + id, options);
  }

  changePassword(id : number, oldPassword : string, newPassword : string) : Observable<number>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
      // Add more headers as needed
    });
    const options = {headers : headers};
    const changePasswordRequest = {oldPassword : oldPassword, newPassword : newPassword}
    return this.http.put<number>("http://localhost:8080/api/users/changepassword/" + id, changePasswordRequest, options);
  }

  updateCompanyAdmin(id : number, updatedCompanyAdmin : CompanyAdmin) : Observable<CompanyAdmin>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
      // Add more headers as needed
    });
    const options = {headers : headers};
    return this.http.put<CompanyAdmin>("http://localhost:8080/api/users/updatecompanyadmin/" + id,updatedCompanyAdmin, options);
  }

  updateEquipment(id : number, updatedEquipment : Equipment) : Observable<Equipment>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
      // Add more headers as needed
    });
    const options = {headers : headers};
    return this.http.put<Equipment>("http://localhost:8080/api/equipments/" + id, updatedEquipment, options)
  }

  deleteEquipment(id : number) : Observable<void>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
      // Add more headers as needed
    });
    const options = {headers : headers};
    return this.http.delete<void>("http://localhost:8080/api/equipments/" + id, options);
  }

  searchEquipment(namePart : string) : Observable<Equipment[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
      // Add more headers as needed
    });
    const options = {headers : headers};
    return this.http.get<Equipment[]>("http://localhost:8080/api/equipments/search/" + namePart, options);
  }

  getPurchaseOrdersForCompanyAdmin(id : number) : Observable<PurchaseOrder[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.get<PurchaseOrder[]>("http://localhost:8080/api/purchaseorder/bycompanyadmin/" + id, options);
  }

  sendMail(request : EmailRequest){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.post<EmailRequest>('http://localhost:8080/api/mailing/send-email',request, options);
  }

  markOrderAsCompleted(purchaseOrder : PurchaseOrder) : Observable<PurchaseOrder>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.put<PurchaseOrder>("http://localhost:8080/api/purchaseorder/changestatus/" + purchaseOrder.id , purchaseOrder, options)
  }

  checkIfAdminIsFree(appointment : Appointment) : Observable<boolean>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.post<boolean>('http://localhost:8080/api/appointments/check-admin-free',appointment, options);
  }

  
}
