import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Seat} from '../model/seat.interface';

@Injectable()
export class SeasonTicketService {
  options: any = {headers: {'Accept': 'application/json'}};
  constructor(private http: HttpClient) { }

  loadSeasonTickets(): Observable<any> {
    return this.http.get('/api/seasonTicket/season-tickets');
  }

  loadBlockRowSeats(): Observable<any> {
    return this.http.get('/api/seasonTicket/block-row');
  }

  createSeasonTicket(seasonTicket, slug) {
    return this.http.post('/api/seasonTicket/' + slug, { ticket: seasonTicket}, this.options);
  }

  deleteSeasonTicket(slug) {
    return this.http.delete('/api/seasonTicket/' + slug, this.options);
  }

  addBlockRow(blockRow) {
    return this.http.post('/api/seasonTicket/addBlock/sector/' + blockRow.sector + '/row/' + blockRow.row,
     {blockRow}, this.options);
  }

  deleteBlockRow(blockRow) {
    return this.http.delete(
      `/api/seasonTicket/deleteBlock/sector/${blockRow.sector}/row/${blockRow.row}`,
      this.options
    );
  }

}
