import {Component, Output, Input, OnInit, OnChanges, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { isEqual, cloneDeep, sortBy } from 'lodash';

import {PriceSchema} from './../../../model/price-schema.interface';

@Component({
  selector: 'edit-price-schema',
  templateUrl: './edit-price-schema.component.html',
  styleUrls: ['./edit-price-schema.component.css']
})

export class EditPriceSchemaComponent implements OnChanges {
  @Input() priceSchema: PriceSchema;
  @Input() colors: any;
  @Output() onUpdateSchema = new EventEmitter<PriceSchema>();

  sourcePriceSchema: PriceSchema;
  priceSchemaForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.priceSchemaForm = formBuilder.group({
      stadiumName: [{value: '', disabled: true}],
      name: [null, Validators.required]
    });
  }

  ngOnChanges(changes) {
    if (changes.priceSchema && changes.priceSchema.currentValue) {
      const currentPriceSchema = changes.priceSchema.currentValue;
      const sortedColorSchema = sortBy(currentPriceSchema.colorSchema, 'price');
      this.sourcePriceSchema = {...currentPriceSchema, colorSchema: sortedColorSchema};
      this.priceSchema = {...this.sourcePriceSchema};
      this.resetForm(changes.priceSchema.currentValue);
    }
  }

  resetForm = (schema) => {
    this.priceSchemaForm.reset();
    this.priceSchemaForm.setValue({
      stadiumName: schema.stadiumName || '',
      name: schema.name || ''
    });
  }

  clickApply(schema) {
    this.priceSchema = { ...schema, name: this.priceSchema.name };
  }

  updateSchema = () => this.onUpdateSchema.emit(this.priceSchema);

  changeColor(colorSchema) {
    this.priceSchema = {...this.priceSchema, colorSchema};
  }

  isPriceSchemaChanged = () => !isEqual(this.sourcePriceSchema, this.priceSchema);

}
