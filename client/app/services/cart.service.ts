import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {Order} from '../model/order.interface';

@Injectable()
export class CartService {
  cart: any;
  constructor(private http: HttpClient, private _cookieService: CookieService) {}

  getCart(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.get('/api/carts/my-cart', options)
      .map(response => {
        this.cart = response;
        return this.cart;
      });
  }

  createCart(): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.post('/api/carts', options)
      .map((response: any) => {
        if (response.publicId) {
          this._cookieService.put('cart', response.publicId);
          return true;
        } else {
          return false;
        }
      });
  }

  getMyCart = () => this.cart || {}

  getMyCartSize = () => this.cart ? this.cart.size : 0

  getMyCartPrice() {
    if (this.cart.seats) {
      return this.cart.seats.reduce((price, seat) => {
        return price + seat.price;
      }, 0);
    }
  }

  addSeatToCart(slug, matchId) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.post('/api/carts/addSeat', {slug: slug, matchId: matchId}, options)
      .map((response: Response) => {
        if (response) {
          this.cart = response;
          return true;
        } else {
          return false;
        }
      });
  }

  removeSeatFromCart(slug, matchId) {
    return this.http.delete('/api/carts/match/' + matchId + '/seat/' + slug)
      .map((response: Response) => {
        if (response) {
          this.cart = response;
          return true;
        } else {
          return false;
        }
      });
  }

  getOrderByPrivateId(privateId): Observable<Order> {
    return this.http.get<Order>('/api/orders/order/' + privateId);
  }

  checkout(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.post('/api/orders/checkout', options);
  }

  pay(freeMessageStatus) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    const body = freeMessageStatus ? {freeMessageStatus} : {};
    return this.http.post<Order>('/api/orders/pay-cashier', body, options);
  }
}
