import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from "../model/user.interface";

@Injectable()
export class UserService {

  token: string;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users/');
  }

  get(): Observable<any> {
    return this.http.get('/api/users/me')
      .map(res => res);
  }

  create(email: string, name: string, isOfferNotification: boolean, password: string): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.post('/api/users',
      JSON.stringify({ email: email, isOfferNotification: isOfferNotification, name: name, password: password }), options)
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        const token: string = response && response.token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  recoverPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.put('/api/users/recovery-password', JSON.stringify({email}), options);
  }

  changePassword(id: string, oldPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers};

    return this.http.put(`/api/users/${id}/password`, JSON.stringify({oldPassword, newPassword}), options);
  }
  //
  // generateGuestPassword(): Observable<any> {
  //   return this.http.get('/api/tickets/statistics', {params: {date: data.date, metod: data.metod}})
  //     .map(res => res.json());
  // }

  setRole(userId, role) {
    return this.http.put(`/api/users/${userId}/change-role/${role}`, null)
  }
}

