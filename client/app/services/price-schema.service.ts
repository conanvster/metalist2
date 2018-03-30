import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PriceSchemaService {

  colors: any = [
    {color: '#8b54aa', colorName: 'violet'},
    {color: '#ffcc00', colorName: 'yellow'},
    {color: '#6f89c0', colorName: 'blue'},
    {color: '#54aa6a', colorName: 'green'},
    {color: '#ff972f', colorName: 'orange'},
    {color: '#ff69b4', colorName: 'pink'},
    {color: '#add8e6', colorName: 'light-blue'},
    {color: '#90EE90', colorName: 'light-green'},
    {color: '#ffb6c1', colorName: 'light-pink'},
    {color: '#8b4513', colorName: 'brown'},

  ];

  constructor(private http: HttpClient) { }

  loadPrices(): Observable<any> {
    return this.http.get('/api/priceSchema');
  }

  savePriceSchema(schema): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    const body = schema;
    return this.http.put('/api/priceSchema/' + schema.id, body, options)
  }

  getPriceBySector(tribuneName, sectorNumber, priceSchema) {

    if (!priceSchema['tribune_' + tribuneName]) {
      return undefined;
    }

    if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
      return priceSchema['tribune_' + tribuneName].price;
    } else {
      if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber].price) {
        return priceSchema['tribune_' + tribuneName].price;
      }
      return priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber].price;
    }
  }

  deletePriceSchema(id: string): Observable<any> {
    return this.http.delete(`/api/priceSchema/${id}`);
  }
}
