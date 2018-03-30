import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'list-item',
  styleUrls: ['./list-item.component.css'],
  template: `
    <div class="list-group-item">
      <span>{{headline}}</span>
      <span>
        <i *ngIf="edit" class="fa" ngClass="fa-pencil" (click)="handleEdit()"></i>
        <i *ngIf="delete" class="fa" ngClass="fa-trash" (click)="handleDelete()"></i>
      </span>
    </div>
  `,
})
export class ListItemComponent {
  @Input() edit: boolean;
  @Input() delete: boolean;
  @Input() headline: string;
  @Output() editItem = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  handleEdit = () => this.editItem.emit();
  handleDelete = () => this.deleteItem.emit();
}
