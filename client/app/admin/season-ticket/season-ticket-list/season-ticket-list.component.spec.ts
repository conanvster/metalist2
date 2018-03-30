import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonTicketListComponent } from './season-ticket-list.component';

describe('SeasonTicketListComponent', () => {
  let component: SeasonTicketListComponent;
  let fixture: ComponentFixture<SeasonTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
