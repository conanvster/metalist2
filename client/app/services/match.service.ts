import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Match} from "../model/match.interface";

@Injectable()
export class MatchService {

  constructor(private http: HttpClient) { }

  fetchMatch(id): Observable<any> {
    return this.http.get('/api/matches/' + id);
  }

  fetchMatchSeats(id) {
    return this.http.get('/api/matches/' + id + '/seats')
      .map((response: Response) => response);
  }

}
