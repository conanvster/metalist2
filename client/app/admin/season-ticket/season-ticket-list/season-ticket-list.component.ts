import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {Seat} from "../../../model/seat.interface";

@Component({
  selector: 'app-season-ticket-list',
  template: `
    <block-row-seat-table [data]="tickets" [isSeatExist]="true" (delete)="onDelete($event)">
    </block-row-seat-table>
  `,
  styleUrls: ['./season-ticket-list.component.css']
})
export class SeasonTicketListComponent implements OnChanges {

  @Input() tickets: Seat[];
  @Output() delete = new EventEmitter<string>();

  ngOnChanges(changes) {
    if (changes.tickets.currentValue) {
      this.tickets = changes.tickets.currentValue;
    }
  }

  onDelete = (element) => this.delete.emit(element.slug);
}
