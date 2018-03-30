import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TeamLogosService {

  constructor(private http:HttpClient) {
  }

  fetchTeamLogos() {
    return this.http.get('/api/file/teamLogos/')
  }

}
