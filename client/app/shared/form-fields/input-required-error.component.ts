import {Component, Input} from '@angular/core';

@Component({
  selector: 'input-required-error',
  template: `
    <span>
      {{field}} {{'common.is' | translate}}
      <strong>{{'common.required' | translate}}</strong>
      полем
    </span>
  `
})

export class InputRequiredErrorComponent {
  @Input() field: string;
}
