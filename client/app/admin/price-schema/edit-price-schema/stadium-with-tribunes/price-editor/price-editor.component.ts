import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {uniq, compact} from 'lodash';

import {Tribune} from '../../../../../model/tribune.interface';
import {Sector} from '../../../../../model/sector.interface';
import {PriceSchema} from '../../../../../model/price-schema.interface';

@Component({
  selector: 'app-price-editor',
  templateUrl: './price-editor.component.html',
  styleUrls: ['./price-editor.component.css']
})

export class PriceEditorComponent implements OnChanges {

  @Input() currentPrice: PriceSchema;
  @Input() currentTribune: Tribune;
  @Input() currentSector: Sector;
  @Output() onClickApply = new EventEmitter<any>();

  sourceTribune: Tribune;
  sourceSector: Sector;
  currentPriceSchema: PriceSchema;

  constructor() {
  }

  ngOnChanges(changes) {
    if (changes.currentTribune || changes.currentSector) {
      this.sourceTribune = {...this.currentTribune};
      this.sourceSector = {...this.currentSector};
      this.currentPriceSchema = {...this.currentPrice};
    }
  }

  changePrice() {
    const tribune = this.currentTribune ? this.currentTribune.name : null;
    const sector = this.currentSector ? this.currentSector.name : null;
    this.currentPriceSchema = this.getPreparedPriceSchema(tribune, sector);
  }

  clickApply() {
    this.changePrice();
    this.currentPriceSchema = this.updateColorSchema(this.currentPriceSchema);
    this.onClickApply.emit(this.currentPriceSchema);
    this.currentTribune = null;
    this.currentSector = null;
  }

  updateColorSchema(priceSchema){
    if (!priceSchema.colorSchema) {
      priceSchema.colorSchema = []
    }
    const uniquePrices = this.getUniquePrices(priceSchema);
    const uniqueColors = priceSchema.colorSchema
      .filter(color => uniquePrices.includes(parseInt(color.price)));
    priceSchema.colorSchema = uniquePrices.map(price => {
      const color = uniqueColors.filter(color => color.price === price)[0];
      return color || {price : price, color : "#ffcc00"};
    });
    return priceSchema;
  }

  getUniquePrices = (obj) => {
    const prices = [];
    const tribunes = Object.keys(obj).filter(key => key.indexOf('tribune') + 1);
    tribunes.forEach(tribuneName => {
      prices.push(obj[tribuneName].price);
      const sectors = Object.keys(obj[tribuneName]).filter(key => key.indexOf('sector') + 1);
      sectors.forEach(sectorName => prices.push(obj[tribuneName][sectorName].price))
    });
    return compact(uniq(prices));
  }

  isPriceChanged() {
    const currentTribunePrice = this.currentTribune && this.currentTribune.price || null;
    const sourceTribunePrice = this.sourceTribune.price || null;
    const currentSectorPrice = this.currentSector && this.currentSector.price || null;
    const sourceSectorPrice = this.sourceSector.price || null;
    return sourceSectorPrice !== currentSectorPrice || sourceTribunePrice !== currentTribunePrice;
  };

  getPreparedPriceSchema(tribuneName, sectorNumber) {
    let priceSchema = this.currentPrice,
      tribune = this.currentTribune,
      sector = this.currentSector;

    if (!priceSchema['tribune_' + tribuneName]) {
      priceSchema['tribune_' + tribuneName] = {name: tribuneName}
    }

    if (tribune.price) {
      priceSchema['tribune_' + tribuneName].price = tribune.price;
    } else {
      delete priceSchema['tribune_' + tribuneName].price;
    }

    if (sectorNumber) {
      delete sector.rows;
      priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber] = sector;
      if (!sector.price) {
        delete priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber];
      }
    }
    return priceSchema;

  }

}
