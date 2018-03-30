import {Component, Input} from '@angular/core';
import {ColorSchema} from '../../model/color-schema.interface';

@Component({
  selector: 'price-category',
  template: `
    <div class="price-category-wrapper">
      <div *ngFor="let color of colorSchema">
        <span [style.backgroundColor]="color?.color"></span>
        <span>{{color?.price}}</span>
        <span>грн.</span>
      </div>
    </div>
  `,
  styleUrls: ['./price-category.component.less']
})

export class PriceCategoryComponent {
  @Input() colorSchema: ColorSchema[];
}
