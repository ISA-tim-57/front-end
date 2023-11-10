import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http : HttpClient) { }

  // getDemoResponse(): Observable<string>{
  //   return this.http.get<string>( 'http://localhost:8080/api/demo');
  // }
}
