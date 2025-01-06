import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  constructor(private http: HttpClient) {}

  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    });
  }

  // API call to get dashboard details
  dashboardDetails(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/grid-data`, {
      headers: this.getAuthHeader()
    });
  }

  userStatusChange(payload: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/users/`, payload, {
      headers: this.getAuthHeader()
    });
  }

  resetPassword(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/reset-password`, payload, {
      headers: this.getAuthHeader()
    });
  }
}
