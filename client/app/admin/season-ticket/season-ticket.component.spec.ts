import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonTicketComponent } from './season-ticket.component';

describe('SeasonTicketComponent', () => {
  let component: SeasonTicketComponent;
  let fixture: ComponentFixture<SeasonTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
