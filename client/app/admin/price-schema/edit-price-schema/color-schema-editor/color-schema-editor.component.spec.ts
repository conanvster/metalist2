import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemaEditorComponent } from './color-schema-editor.component';

describe('ColorSchemaEditorComponent', () => {
  let component: ColorSchemaEditorComponent;
  let fixture: ComponentFixture<ColorSchemaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSchemaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSchemaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
