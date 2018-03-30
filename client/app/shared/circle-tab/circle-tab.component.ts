import { Component, Input } from '@angular/core';

@Component({
  selector: 'circle-tab',
  template: `
    <div class="circle-tab-container">
      <logo-circle [right]="false" dimension="70"></logo-circle>
      <span>{{'metalist' | uppercase}}<br/>1925</span>
      <span class="match-vs">VS</span>
      <span class="rival">{{rival}}</span>
      <logo-circle [right]="true" dimension="70" [image]="image"></logo-circle>
    </div>`,
  styleUrls: ['./circle-tab.component.less']
})

export class CircleTabComponent {
  // @Input() diameter: number;
  @Input() rival: string;
  @Input() image: string;

}
