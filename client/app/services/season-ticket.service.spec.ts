import { TestBed, inject } from '@angular/core/testing';

import { SeasonTicketService } from './season-ticket.service';

describe('SeasonTicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeasonTicketService]
    });
  });

  it('should be created', inject([SeasonTicketService], (service: SeasonTicketService) => {
    expect(service).toBeTruthy();
  }));
});
