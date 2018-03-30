import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-button',
  template: '<a class="home" routerLink=""><i class="fa fa-home" aria-hidden="true"></i></a>',
  styleUrls: ['./home-button.component.less']
})

export class HomeButtonComponent {
}
