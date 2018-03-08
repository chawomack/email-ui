import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }

  getEmails(): Observable<any> {
    return this.http.get('/assets/emails.json')
      .map((data: {messages: any[]}) => data.messages);
  }
}
