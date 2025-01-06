import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api';  // Replace with your backend URL

  constructor(private http: HttpClient) { }

  // Login method
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, credentials);
  }

  // Register method
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

// auth.service.ts
storeTokens(accessToken: string, refreshToken: string, rememberMe: boolean, email: string): void {
  if (rememberMe) {
    // Store in localStorage for persistence across sessions
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('email', email);  // Store the email
  } else {
    // Store in sessionStorage for current session only
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
    sessionStorage.setItem('email', email);  // Store the email
  }
}


  // Get JWT access token
  getAccessToken(): string | null {
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  }

  // Get user role from the JWT token (assumes user type is embedded in the token)
  getUserRole(): number | null {
    const token = this.getAccessToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_type;  // Assuming `user_type` is part of the token payload
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }
}
