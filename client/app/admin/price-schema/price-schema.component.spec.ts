import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSchemaComponent } from './price-schema.component';

describe('PriceSchemaComponent', () => {
  let component: PriceSchemaComponent;
  let fixture: ComponentFixture<PriceSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
