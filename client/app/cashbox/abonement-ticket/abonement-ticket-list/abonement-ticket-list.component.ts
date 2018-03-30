import {Component, Input, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';


@Component({
  selector: 'abonement-ticket-list',
  templateUrl: './abonement-ticket-list.component.html',
  styleUrls: ['./abonement-ticket-list.component.css']
})
export class AbonementTicketListComponent {
  @Input() seasonTickets;
  @Output() deleteTicket = new EventEmitter<any>();

  constructor() {
  }

  handleDelete = (ticket) => this.deleteTicket.emit(ticket)
}
