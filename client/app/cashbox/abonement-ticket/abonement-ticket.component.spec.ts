import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonementTicketComponent } from './abonement-ticket.component';

describe('AbonementTicketComponent', () => {
  let component: AbonementTicketComponent;
  let fixture: ComponentFixture<AbonementTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonementTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonementTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
