import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})

export class DeleteItemComponent {
  itemId: string;

  @Output() deleteItem: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleClick() {
    this.deleteItem.emit(this.itemId);
    this.itemId = '';
  }
}
