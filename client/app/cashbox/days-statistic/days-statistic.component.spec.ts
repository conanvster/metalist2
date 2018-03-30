import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysStatisticComponent } from './days-statistic.component';

describe('DaysStatisticComponent', () => {
  let component: DaysStatisticComponent;
  let fixture: ComponentFixture<DaysStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
