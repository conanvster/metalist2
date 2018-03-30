import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchEditorService {

  constructor(private http: HttpClient) { }

  loadNextMatches(): Observable<any> {
    return this.http.get('/api/matches/next/');
  }

  loadPrevMatches(): Observable<any> {
    return this.http.get('/api/matches/prev/');
  }

  createMatch(match) {
    return this.http.post('/api/matches', match);
  }

  editMatch(match) {
    return this.http.put(`/api/matches/${match._id}`, match);
  }

  deleteMatch(matchId) {
    return this.http.delete(`/api/matches/${matchId}`);
  }

}
