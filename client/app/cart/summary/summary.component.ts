import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-summary',
  template: `
    <div>
      <span>{{'summary.total' | translate}}: {{'summary.places' | translate}} - </span>
      <span>{{ getSize() }}</span>
      <span>, {{'summary.toPay' | translate}} - </span>
      <span>{{ getPrice() }} грн.</span>
    </div>
  `,
  styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit {
  cart: any;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.getCart();
  }

  getCart = () => this.cartService.getCart()
    .subscribe(
      result => this.cart = result
    )

  getPrice() {
    const seats = this.getSeats();
    if (seats) {
      return seats.reduce((price, seat) => {
        return price + seat.price;
      }, 0);
    } else {
      return 0;
    }
  }

  getSize = () => this.cartService.getMyCartSize();

  getSeats = () => this.cartService.getMyCart().seats;

}
