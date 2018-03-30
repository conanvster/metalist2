import {Component, Input, Output, EventEmitter} from '@angular/core';

import {PriceSchema} from '../../../model/price-schema.interface';

@Component({
  selector: 'price-schema-menu',
  templateUrl: './price-schema-menu.component.html',
  styleUrls: ['./price-schema-menu.component.css']
})
export class PriceSchemaMenuComponent {

  @Input() priceSchemas: { priceSchema: PriceSchema }[];
  @Output() onSetSchema = new EventEmitter<boolean>();
  @Output() onDeleteSchema = new EventEmitter<any>();

  constructor() {
  }

  selectSchema = (schema) => this.onSetSchema.emit({...schema.priceSchema, id: schema.id});
  createSchema = (schema) => this.onSetSchema.emit(schema);
}
