import {Component, Input, OnChanges} from '@angular/core';
import sortBy from 'lodash/sortBy';

@Component({
  selector: 'app-days-summary',
  templateUrl: './days-summary.component.html',
  styleUrls: ['./days-summary.component.css']
})
export class DaysSummaryComponent implements OnChanges {

  @Input() dayStatistics: any = [];

  constructor() { }

  ngOnChanges(changes) {
    if (changes.dayStatistics.currentValue.length) {
      this.dayStatistics = changes.dayStatistics.currentValue;
    } else {
      this.dayStatistics = [];
    }
  }
  sortByPrice = (details) => sortBy(details, ['price'])
}
