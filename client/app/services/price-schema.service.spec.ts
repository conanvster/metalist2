import { TestBed, inject } from '@angular/core/testing';

import { PriceSchemaService } from './price-schema.service';

describe('PriceSchemaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceSchemaService]
    });
  });

  it('should be created', inject([PriceSchemaService], (service: PriceSchemaService) => {
    expect(service).toBeTruthy();
  }));
});
