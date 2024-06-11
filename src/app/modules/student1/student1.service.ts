import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Appointment } from 'src/app/model/appointment.model';
import { BasicUser } from 'src/app/model/basic-user.model';
import { Company } from 'src/app/model/company.model';
import { Equipment } from 'src/app/model/equipment.model';
import { OrderEquipment } from 'src/app/model/order-equipment';
import { PurchaseOrder } from 'src/app/model/purchase-order.model';

@Injectable({
  providedIn: 'root'
})
export class Student1Service {

  constructor(private http: HttpClient) { 

    
  }


  async verifyUser(id: number): Promise<void> {
    try {
      const response = await this.http.put(`http://localhost:8080/api/auth/verification/${id}`, {}).toPromise();
      console.log('Verification successful:', response);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  }



  addUser(user : BasicUser): Observable<BasicUser>{
    return this.http.post<BasicUser>('http://localhost:8080/api/auth/register', user);
  }


  
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('http://localhost:8080/api/companies/all');
  }

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>('http://localhost:8080/api/equipments/all');
  }

  getResponse() : Observable<string>{
    return this.http.get("http://localhost:8080/api/auth",{ responseType: 'text' });
  }

  getEquipmentsByCompanyId(companyId: number): Observable<Equipment[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.get<Equipment[]>(`http://localhost:8080/api/companies/${companyId}/equipments`,options);
  }

  getAppointmentsByCompanyId(companyId: number): Observable<Appointment[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
    return this.http.get<Appointment[]>(`http://localhost:8080/api/companies/${companyId}/appointments`,options);
  }

  createPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    });
    const options = {headers : headers};
   return this.http.post<PurchaseOrder>('http://localhost:8080/api/purchaseorder/add', purchaseOrder,options);
  }

  // New method to get equipment orders by user ID
  getEquipmentOrderByUserId(userId: number): Observable<OrderEquipment[]> {
    return this.http.get<OrderEquipment[]>(`http://localhost:8080/api/user/${userId}`);
  }



}
