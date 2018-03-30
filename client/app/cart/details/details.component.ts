import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  @Input() seats: any;
  @Output() onDelete = new EventEmitter<any>();

  constructor() {}

  removeSeat(slug, matchId) {
    this.onDelete.emit({slug, matchId});
  }
}
