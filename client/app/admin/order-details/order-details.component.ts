import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {Order} from '../../model/order.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  order: Order;
  privateId: string;
  message: string;

  constructor(private cartService: CartService) { }

  getOrder() {
    this.order = null;
    this.message = '';
    this.cartService.getOrderByPrivateId(this.privateId)
      .subscribe(
        response => this.order = response,
        err => this.message = 'getOrderFail',
      )
  }

}
