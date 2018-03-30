import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Ticket} from '../../model/ticket.interface';
import {Seat} from '../../model/seat.interface';

@Component({
  selector: 'ticket-item',
  template: `
    <tr class="ticket-item-wrapper">
      <td width="5%" *ngIf="type" class="number">{{index}}</td>
      <td width="5%" *ngIf="type">
          <span class="indicator" [style.background]="type ==='tickets' ? '#00426b' : '#fc2c34'">&nbsp;</span>
      </td>
      <td class="text-container">
        <span [translate]="'stadium.'+ ticket.tribune" *ngIf="type"></span>
        <span *ngIf="type">,</span>
        <span [style.textTransform]="type ? 'lowercase' : 'capitalize'">сектор - {{ ticket.sector }},</span>
        <span>ряд - {{ ticket.row }},</span>
        <span *ngIf="type; else elsePlace">{{'common.place' | translate | lowercase}} - {{ticket.seat}},</span>
        <ng-template #elsePlace>
          <span>м. - {{ticket.seat}}</span>
        </ng-template>
        <span *ngIf="type">{{'common.price' | translate}} - {{ticket.price || ticket.amount}};</span>
        <span *ngIf="!type">- {{ticket.price}}грн;</span>
      </td>
      <td width="1%" class="symbol" style="cursor: pointer;">
        <i *ngIf="type ==='tickets'; else elseBlock" class="fa fa-print" aria-hidden="true" (click)="handlePrint()"></i>
        <ng-template #elseBlock>
          <i class="fa fa-times" aria-hidden="true" (click)="handleDelete()"></i>
        </ng-template>
      </td>
    </tr>
  `,
  styleUrls: ['./ticket-item.component.less']
})

export class TicketItemComponent {
  @Input() ticket: any;
  @Input() type: string;
  @Input() index: number;
  @Output() onClick = new EventEmitter();

  handleDelete() {
    this.onClick.emit({
      slug: this.ticket.slug,
      sector: this.ticket.sector,
      row: this.ticket.row,
      seat: this.ticket.seat,
      matchId: this.ticket.match._id
    });
  }
  handlePrint() {
    this.onClick.emit({ticket: this.ticket});
  }
}
