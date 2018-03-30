import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockRowListComponent } from './block-row-list.component';

describe('BlockRowListComponent', () => {
  let component: BlockRowListComponent;
  let fixture: ComponentFixture<BlockRowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockRowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockRowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
