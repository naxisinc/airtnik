import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private helper: JwtHelperService) {}

  authenticateUser(credentials) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('users/login', credentials, {
      headers,
      observe: 'response'
    });
  }

  verifyEmail(email) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('users/verify-email', email, {
      headers
    });
  }

  changePassword(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth': data.token
    });
    return this.http.patch('users/change-password', data, {
      headers
    });
  }

  logout() {
    const headers = new HttpHeaders({
      'x-auth': localStorage.getItem('x-auth')
    });
    return this.http.delete('users/logout', {
      headers,
      observe: 'response'
    });
  }

  loggedIn() {
    return !this.helper.isTokenExpired();
  }
}
