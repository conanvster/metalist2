import {Component, Input, Output, EventEmitter} from '@angular/core';

import { Match } from '../../../model/match.interface';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
})

export class MatchListComponent {

  @Input() matches: Match[] = [];

  @Input() type: string;

  @Output() deleteMatch: EventEmitter<any> = new EventEmitter();
  @Output() editMatch: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleEdit = (match: Match) => this.editMatch.emit(match);
  handleDelete = (match: Match) => this.deleteMatch.emit(match.id);

}
