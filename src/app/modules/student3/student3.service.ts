import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Student3Service {

  constructor(private http : HttpClient) { }

  getDemoResponse(): Observable<string>{
    return this.http.get<string>( 'https://localhost:8080/api/demo');
  }
}
