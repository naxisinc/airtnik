import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SendEmailService {
  constructor(private http: HttpClient) {}

  send(mailOptions) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('users/send-email', mailOptions, { headers });
  }
}
