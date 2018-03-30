import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import { PrintTicketService } from '../../services/print-ticket.service';
import { TicketService } from '../../services/ticket.service';
import {AuthService} from '../../services/auth.service';
import {Ticket} from '../../model/ticket.interface';

// import * as moment from "moment";
// import _date = moment.unitOfTime._date;

@Component({
  selector: 'app-last-tickets',
  templateUrl: './last-tickets.component.html',
  styleUrls: ['./last-tickets.component.css']
})
export class LastTicketsComponent implements OnInit {

  statistics: any = [];
  lastTickets: Ticket[] = [];
  tickets: Ticket[] = [];
  date: Date = new Date();

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.getStatistics({
      date: event.value.toISOString(),
      metod: 'event'
    });
  }

  constructor(
    private ticketsService: TicketService,
    private printTicketService: PrintTicketService,
    private authenticationService: AuthService
  ) {}

  ngOnInit() {
    this.getStatistics({
      date: this.date.toISOString(),
      metod: 'event'
    });
  }

  getStatistics(date) {
    if (this.authenticationService.isCashier()) {
      this.ticketsService.getStatistics(date)
        .subscribe(statistic => {
          this.statistics = statistic;
        });
    }
  }

  prints = ({tribune, sector, row, seat, amount, accessCode, headline, freeMessageStatus}) =>
    this.printTicketService.print([{amount, accessCode, tribune, sector, row, seat, match: {headline}}], freeMessageStatus)

  removeTicket(ticketId) {
    return this.ticketsService.removeTicket(ticketId)
      .subscribe(
        () => this.getStatistics({date: this.date, metod: 'event'}),
        err => console.log(err)
      )
  }

}
