import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CapabilityService {
  constructor(private http: HttpClient) {}

  // Public Route
  getCapabilities(type) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get('capabilities/' + type, {
      headers
    });
  }

  // Private Route
  addCapability(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth': localStorage.getItem('X-Auth')
    });
    return this.http.post('capabilities/add', data, {
      headers
    });
  }

  // Private Route
  updateCapability(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth': localStorage.getItem('X-Auth')
    });
    return this.http.put('capabilities/' + data._id, data, {
      headers
    });
  }

  // Private Route
  removeItem(id) {
    const headers = new HttpHeaders({
      'X-Auth': localStorage.getItem('X-Auth')
    });
    return this.http.delete('capabilities/' + id, {
      headers
    });
  }
}
