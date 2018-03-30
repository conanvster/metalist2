import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';

import {PriceSchema} from '../../../../model/price-schema.interface';
import {Tribune} from '../../../../model/tribune.interface';
import {Sector} from '../../../../model/sector.interface';
import {AppConstant} from "../../../../app.constant";

@Component({
  selector: 'app-stadium-with-tribunes',
  templateUrl: './stadium-with-tribunes.component.html',
  styleUrls: ['./stadium-with-tribunes.component.css']
})
export class StadiumWithTribunesComponent implements OnChanges {

  @Input() priceSchema: PriceSchema;
  @Output() onClickApply = new EventEmitter<any>();

  currentTribune: Tribune|null;
  currentSector: Sector|null;
  stadium: any = AppConstant.StadiumMetalist;

  constructor() {
  }

  ngOnChanges(changes) {
    if (changes.priceSchema && changes.priceSchema.currentValue) {
      this.priceSchema = { ...changes.priceSchema.currentValue};
      this.stadium = {...this.stadium};
    }
  }

  clickApply(priceSchema) {
    this.onClickApply.emit(priceSchema);
    this.currentSector = null;
    this.currentTribune = null;
  }

  selectTribune(tribuneName) {
    if (this.priceSchema['tribune_' + tribuneName]) {
      this.currentTribune = {...this.priceSchema['tribune_' + tribuneName]};
    } else {
      this.currentTribune = {name: tribuneName};
    }
    this.currentSector = null;
  }

  getSectorForSetPrice($event) {

    let priceSchema = this.priceSchema,
      tribuneName = $event.tribune,
      sectorNumber = $event.sector;

    if (!priceSchema['tribune_' + tribuneName]) {
      this.currentTribune = Object.assign({}, this.stadium['tribune_' + tribuneName]);
      this.currentSector = Object.assign({}, this.stadium['tribune_' + tribuneName]['sector_' + sectorNumber]);
    } else {
      this.currentTribune = priceSchema['tribune_' + tribuneName];

      if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
        this.currentSector = Object.assign({}, this.stadium['tribune_' + tribuneName]['sector_' + sectorNumber]);
      } else {
        this.currentSector = priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber];
      }
    }
  }

  isStadium(stadiumName) {
    if (this.hasOwnProperty('priceSchema')) {
      if (this.priceSchema.hasOwnProperty('stadiumName')) {
        if (this.priceSchema.stadiumName === stadiumName) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
