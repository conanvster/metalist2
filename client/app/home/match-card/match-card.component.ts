import {Component, Input} from '@angular/core';
import {Match} from '../../model/match.interface';

@Component({
  selector: 'match-card',
  template: `
    <div class="card-wrapper">
      <span *ngIf="match?.date" class="match-date">{{match.date | localeDate:'DD MMMM YYYY'}}</span>
      <span *ngIf="match?.date" class="match-time">{{match.date | localeDate:'HH:mm'}}</span>
      <div [ngClass]="['desktop', page]">
        <div class="match-metalist">
          <logo-circle [right]="false"></logo-circle>
          <span>{{'common.metalist' | translate}}<br/>1925</span>
        </div>
        <span class="match-vs">VS</span>
        <div class="match-rival">
          <logo-circle [right]="true" [image]="match?.poster"></logo-circle>
          <span>{{match?.rival}}</span>
        </div>
      </div>
      <div [ngClass]="['mobile', page]">
        <circle-tab [rival]="match?.rival" [image]="match?.poster"></circle-tab>
      </div>
      <button *ngIf="!page" class="classic" [routerLink]="'/match/' + match?.id">{{'home.buyTicket' | translate}}</button>
      <button *ngIf="page" class="classic" [routerLink]="'/'">{{'home.main' | translate}}</button>
      <span class="match-address">{{'match.stadiumMetalist' | translate}}</span>
      <span class="match-address">{{'match.address' | translate}}</span>
      <span class="match-address">
        <img src="assets/images/subway.png" alt="subway">{{'match.subway' | translate}}
      </span>
    </div>
  `,
  styleUrls: ['./match-card.component.less']
})

export class MatchCardComponent {
  @Input() match: Match;
  @Input() page = '';

}
