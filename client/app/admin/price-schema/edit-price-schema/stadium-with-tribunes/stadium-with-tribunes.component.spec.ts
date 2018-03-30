import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumWithTribunesComponent } from './stadium-with-tribunes.component';

describe('StadiumWithTribunesComponent', () => {
  let component: StadiumWithTribunesComponent;
  let fixture: ComponentFixture<StadiumWithTribunesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadiumWithTribunesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumWithTribunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
