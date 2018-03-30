import {Component} from '@angular/core';

@Component({
  selector: 'sector-legend',
  template: `
    <div class="legend-wrapper">
      <span class="soldSeat" [style.backgroundColor]="data[0].color"></span>
      <span>&nbsp;-&nbsp;{{data[0].value | translate}}</span>
      <span class="blockedSeat" [style.backgroundColor]="data[1].color"></span>
      <span>&nbsp;-&nbsp;{{data[1].value | translate}}</span>
      <span class="availableSeat" [style.backgroundColor]="data[2].color"></span>
      <span>&nbsp;-&nbsp;{{data[2].value | translate}}</span>
    </div>
  `,
  styleUrls: ['./legend.component.less']
})

export class LegendComponent {
  data = [
    {color: '#a2a2a2', value: 'match.soldSeat'},
    {color: '#fa2c34', value: 'match.blockedSeat'},
    {color: '#00426b', value: 'match.availableSeat'}
  ];

}
