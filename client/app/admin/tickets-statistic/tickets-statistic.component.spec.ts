import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsStatisticComponent } from './tickets-statistic.component';

describe('TicketsStatisticComponent', () => {
  let component: TicketsStatisticComponent;
  let fixture: ComponentFixture<TicketsStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
