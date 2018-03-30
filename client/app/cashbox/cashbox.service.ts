import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CashboxService {

  constructor(private http: HttpClient) { }

  getTicketByAccessCode(accessCode) {
    return this.http.get('api/tickets/abonticket/' + accessCode);
  }

  setTicketUsed(ticketId) {
    return this.http.get('api/tickets/useabonticket/' + ticketId);
  }

}
