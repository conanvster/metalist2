import {Component, OnDestroy, OnInit} from '@angular/core';
import {sortBy, uniq, cloneDeep} from 'lodash';

import {CartService} from '../services/cart.service';
import {AuthService} from '../services/auth.service';

import moment from 'moment-timezone';
import {Cart} from '../model/cart.interface';
import {Subscription} from 'rxjs/Subscription';

interface Duration {
  minutes: number,
  seconds: number
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  cart: Cart;
  duration: Duration;
  expirationDate: string;
  isReservationExpired: boolean;
  refetchTime: number;
  checkoutMessage: string;
  isLoggedIn: boolean;
  subscription: Subscription;
  data: any[];

  constructor(private cartService: CartService, private authenticationService: AuthService) {
  }

  ngOnInit() {
    this.getCart();
    this.subscription = this.authenticationService.user
      .subscribe(value => {
        this.isLoggedIn = Boolean(value);
      });
  }

  checkTime = () => {
    if (this.refetchTime || !this.expirationDate) {
      return;
    }
    this.refetchTime = window.setInterval(() => {
      this.isReservationExpired = moment().isAfter(this.expirationDate);
      if (this.isReservationExpired) {
        this.clearInterval();
      }
      const timeDifference = moment(this.expirationDate).diff(moment(), 'seconds');
      this.duration = {
        minutes: Math.floor(timeDifference / 60),
        seconds: timeDifference % 60
      }
    }, 1000);
  };

  clearInterval = () => window.clearInterval(this.refetchTime);

  ngOnDestroy() {
    this.clearInterval();
    this.subscription.unsubscribe();
  }

  getCart = () => {
    this.cartService.getCart()
      .subscribe(
        response => {
          this.cart = response;
          this.data = this.prepareData(response.seats);
          this.getExpirationDate();
          this.checkTime();
        },
        err => console.log(err)
      );
  }

  removeOptimisticSeat = (slug, matchId) => {
    const data = cloneDeep(this.data);
    const targetMatch = data.find(({match}) => match.id === matchId);
    if (!targetMatch) {
      return;
    }
    const seats = targetMatch.seats.filter(({sector, row, seat}) => {
      return slug !== `s${sector}r${row}st${seat}`;
    })
    targetMatch.seats = seats;
    if (!seats.length) {
      data.filter(({match}) => match.id !== matchId);
    }
    this.data = data;
  }
  removeSeat = ({slug, matchId}) => {
    this.removeOptimisticSeat(slug, matchId);
    this.cartService.removeSeatFromCart(slug, matchId)
      .subscribe(
        () => this.getCart()
      );
  }

  getExpirationDate() {
    sortBy(this.cart.seats, ['reservedUntil']);
    if (this.cart.seats.length) {
      this.expirationDate = this.cart.seats.slice(-1)[0].reservedUntil;
    }
  }

  checkout = () => {
    this.cartService.checkout()
      .subscribe(
        result => {
          window.location.href = result.paymentLink;
        },
        err => {
          this.checkoutMessage = 'fail';
          if (err.status === 406) {
            // seats are not reserved
            this.isReservationExpired = true;
          }
          if (err.status === 404) {
            this.checkoutMessage = 'orderNotFound';
          }
        }
      );
  }

  prepareData = (data) => {
    const matchIds = uniq(data.map(({match: {id}}) => id));
    const finalData = matchIds.map(id => ({match: {_id: id}, seats: []}));
    data.forEach(({match, tribune, sector, row, seat, price, slug}) => {
      const result = finalData.find(({match: {_id}}) => _id === match._id);
      result.match = match;
      result.seats.push({tribune, sector, row, seat, price, slug, match});
    });
    return finalData;
  }
}
