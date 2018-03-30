import { Component, Input } from '@angular/core';

@Component({
  selector: 'back-button',
  template: '<a class="home" [routerLink]="backUrl"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
  styleUrls: ['./back-button.component.less']
})

export class BackButtonComponent {
  @Input() backUrl: string;
}
