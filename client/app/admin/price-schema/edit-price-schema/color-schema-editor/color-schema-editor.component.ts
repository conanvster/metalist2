import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {cloneDeep, isEqual} from 'lodash';

import {ColorSchema} from '../../../../model/color-schema.interface';
import {Color} from '../../../../model/color.interface';

@Component({
  selector: 'app-color-schema-editor',
  templateUrl: './color-schema-editor.component.html',
  styleUrls: ['./color-schema-editor.component.css']
})
export class ColorSchemaEditorComponent implements OnChanges {

  @Input() colorSchema: ColorSchema[];
  @Input() colors: Color[];
  @Output() onEdit = new EventEmitter<boolean>();

  sourceColorSchema: ColorSchema[];

  constructor() {
  }

  ngOnChanges(changes) {
    if (changes.colorSchema) {
      this.colorSchema = cloneDeep(changes.colorSchema.currentValue);
      this.sourceColorSchema = cloneDeep(this.colorSchema);
    }
  }

  edit(colorSchema) {
    this.onEdit.emit(colorSchema);
  }

  isColorChanged = () => !isEqual(this.sourceColorSchema, this.colorSchema)
}
