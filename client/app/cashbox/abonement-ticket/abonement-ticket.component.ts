import {Component, OnInit} from '@angular/core';
import {CashboxService} from '../cashbox.service';
import {SeasonTicketService} from '../../services/season-ticket.service';
import {Ticket} from '../../model/ticket.interface';

@Component({
  selector: 'app-abonement-ticket',
  templateUrl: './abonement-ticket.component.html',
  styleUrls: ['./abonement-ticket.component.css']
})
export class AbonementTicketComponent implements OnInit {

  accessCode: string;
  seatMessage: string;
  abonementMessage: string;
  seasonTickets: Ticket[];
  preSellTicket;
  lastTickets: Ticket[];
  ticket: Ticket[];

  constructor(private cashboxService: CashboxService, private seasonTicketService: SeasonTicketService) {
  }

  ngOnInit() {
    this.loadSeasonTickets();
  }

  loadSeasonTickets() {
    this.seasonTicketService.loadSeasonTickets()
      .subscribe(
        response => this.seasonTickets = response,
        err => console.log(err)
      );
    this.seatMessage = '';
  }

  handleDeleteTicket(ticket) {
    this.seasonTicketService.deleteSeasonTicket(ticket.slug)
      .subscribe(
        result => this.loadSeasonTickets(),
        err => {
          console.log(err);
          this.abonementMessage = 'fail';
        }
      );
  }

  regTicket(accessCode) {
    this.seatMessage = '';
    this.cashboxService.getTicketByAccessCode(accessCode)
      .subscribe(
        (response) => this.preSellTicket = response,
        (err) => console.log(err)
      )

  }

  createSeasonTicket() {
    this.seatMessage = '';
    const {seat} = this.preSellTicket;
    const slug = `s${seat.sector}r${seat.row}st${seat.seat}`;
    const ticket = this.preSellTicket.seat;
    ticket.accessCode = this.preSellTicket.accessCode;
    this.seasonTicketService.createSeasonTicket(ticket, slug)
      .subscribe(
        () => {
          this.seatMessage = 'success';
          this.cashboxService.setTicketUsed(this.preSellTicket._id)
            .subscribe();
          this.preSellTicket = null;
        },
        err => {
          this.seatMessage = 'fail';
          if (err.status === 409) {
            this.seatMessage = 'alreadyTaken';
          }
        }
      );
  }

}
