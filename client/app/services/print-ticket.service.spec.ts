import { TestBed, inject } from '@angular/core/testing';

import { PrintTicketService } from './print-ticket.service';

describe('PrintTicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrintTicketService]
    });
  });

  it('should be created', inject([PrintTicketService], (service: PrintTicketService) => {
    expect(service).toBeTruthy();
  }));
});
