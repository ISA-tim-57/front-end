import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BasicUser } from 'src/app/model/basic-user.model';
import { Company } from 'src/app/model/company.model';
import { Equipment } from 'src/app/model/equipment.model';

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

  

}
