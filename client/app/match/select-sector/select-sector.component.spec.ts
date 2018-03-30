import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSectorComponent } from './select-sector.component';

describe('SelectSectorComponent', () => {
  let component: SelectSectorComponent;
  let fixture: ComponentFixture<SelectSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
