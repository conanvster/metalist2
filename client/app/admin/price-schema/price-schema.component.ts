import {Component, OnInit} from '@angular/core';

import {PriceSchemaService} from '../../services/price-schema.service';

import {PriceSchema} from '../../model/price-schema.interface';
import {ColorSchema} from '../../model/color-schema.interface';

@Component({
  selector: 'app-price-schema',
  templateUrl: './price-schema.component.html',
  styleUrls: ['./price-schema.component.css']
})
export class PriceSchemaComponent implements OnInit {

  priceSchemas: PriceSchema[] = [];
  sourcePriceSchema: PriceSchema;
  currentPriceSchema: PriceSchema | null;
  colors: ColorSchema[];
  message = '';
  constructor(private priceSchemaService: PriceSchemaService) {
  }

  ngOnInit() {
    this.loadPriceSchemas();
    this.colors = this.priceSchemaService.colors;
  }

  loadPriceSchemas() {
    this.priceSchemaService.loadPrices()
      .subscribe(
        response => {
          this.priceSchemas = response;
        },
        err => console.log(err)
      );
  }

  setCurrentSchema(schema) {
    this.message = '';
    this.sourcePriceSchema = {...schema};
    this.currentPriceSchema = {...this.sourcePriceSchema};
  }

  updateSchema(schema) {
    this.message = '';
    this.priceSchemaService.savePriceSchema(schema)
      .subscribe(
        (response: any) => {
          this.currentPriceSchema = {...response.data};
          this.loadPriceSchemas();
          this.currentPriceSchema = null;
          this.message = 'editSuccess';
        },
        err => {
          this.message = 'editFail';
          console.log(err);
        }
      );
  }

  deleteSchema(schemaId) {
    this.message = '';
    this.priceSchemaService.deletePriceSchema(schemaId)
      .subscribe(
        () => {
          this.loadPriceSchemas();
          this.priceSchemas = this.priceSchemas.filter(schema => schema.id !== schemaId);
          this.currentPriceSchema = this.currentPriceSchema && this.currentPriceSchema.id === schemaId ? null : this.currentPriceSchema;
          this.message = 'deleteSuccess';
        },
        err => {
          console.log(err);
          this.message = 'deleteFail';
        }
      );
  }

}
