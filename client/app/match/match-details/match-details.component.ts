import {Component, Input} from '@angular/core';

import moment from 'moment-timezone';
import {Match} from '../../model/match.interface';

interface MatchDetails extends Match {
  formattedDate: string,
  time: string
}

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.less']
})
export class MatchDetailsComponent {

  @Input() matchDetails: MatchDetails;
  @Input() stadiumName: string;
}
