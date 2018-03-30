import {Component, Input, OnChanges} from '@angular/core';
import sortBy from 'lodash/sortBy';

@Component({
  selector: 'app-events-summary',
  templateUrl: './events-summary.component.html',
  styleUrls: ['./events-summary.component.css']
})
export class EventsSummaryComponent implements OnChanges {
  @Input() eventStatistics: any = [];

  constructor() { }

  ngOnChanges(changes) {
    if (changes.eventStatistics && changes.eventStatistics.currentValue.length) {
      this.eventStatistics = changes.eventStatistics.currentValue.slice();
    } else {
      this.eventStatistics = [];
    }
  }

  sortBySector = (details) => sortBy(details, ['sector'])

}
