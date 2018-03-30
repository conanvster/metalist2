import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonementTicketListComponent } from './abonement-ticket-list.component';

describe('AbonementTicketListComponent', () => {
  let component: AbonementTicketListComponent;
  let fixture: ComponentFixture<AbonementTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonementTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonementTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
