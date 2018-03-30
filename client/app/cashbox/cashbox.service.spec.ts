import { TestBed, inject } from '@angular/core/testing';

import { CashboxService } from './cashbox.service';

describe('CashboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashboxService]
    });
  });

  it('should be created', inject([CashboxService], (service: CashboxService) => {
    expect(service).toBeTruthy();
  }));
});
