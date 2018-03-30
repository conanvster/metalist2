import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FileService {

  constructor(private http:HttpClient) {
  }

  loadTeamLogos() {
    return this.http.get('/api/file/teamLogos/');
  }

  upload(file, fieldName) {
    const formData = new FormData();
    formData.append(fieldName, file);
    return this.http.post('/api/file/upload', formData);
  }

}
