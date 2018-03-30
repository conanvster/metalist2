import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPriceSchemaComponent } from './price-schema-menu.component';

describe('MenuPriceSchemaComponent', () => {
  let component: MenuPriceSchemaComponent;
  let fixture: ComponentFixture<MenuPriceSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPriceSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPriceSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
