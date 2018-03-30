import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Seat} from '../../../model/seat.interface';

@Component({
  selector: 'app-block-row-list',
  template: `
    <block-row-seat-table [data]="blockRows" [isSeatExist]="false" (delete)="onDelete($event)">
    </block-row-seat-table>
  `,
  styleUrls: ['./block-row-list.component.css']
})
export class BlockRowListComponent implements OnChanges {

  blockRows: Seat[];
  @Input() blockRowSeats: any = [];
  @Output() delete = new EventEmitter();

  constructor() {
  }

  ngOnChanges(changes) {
    if (changes.blockRowSeats && changes.blockRowSeats.currentValue) {
      this.blockRows = this.createBlockRowsModel(changes.blockRowSeats.currentValue);
    }
  }

  createBlockRowsModel(seats) {
    let rows = [];
    seats.forEach(seat => {
      if (this.checkSeatInRows(rows, seat)) {
        let row = {
          sector: seat.sector,
          row: seat.row,
          reservedUntil: seat.reservedUntil
        };
        rows.push(row);
      }
    });
    return rows;
  }

  checkSeatInRows(rows, seat) {
    return !rows.filter(row => (row.sector === seat.sector && row.row === seat.row)).length;
  }

  onDelete(blockRow) {
    this.delete.emit(blockRow);
  }


}
