import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysSummaryComponent } from './days-summary.component';

describe('DaysSummaryComponent', () => {
  let component: DaysSummaryComponent;
  let fixture: ComponentFixture<DaysSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
