import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo-circle',
  template: `<div [ngClass]="{'circle': true, 'classic': !dimension, 'small': dimension, 'right': right, 'left': !right}"
                  [style.backgroundImage]="style"></div>`,
  styleUrls: ['./logo-circle.component.less']
})

export class LogoCircleComponent {
  @Input() dimension: number;
  @Input() right: boolean;
  @Input() image: string;

  get style() {
    return this.image ? `url(${this.image})` : 'url(assets/teamLogo/metalist.png)';
  }
}
