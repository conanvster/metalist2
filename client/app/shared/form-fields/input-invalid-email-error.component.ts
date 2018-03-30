import {Component} from '@angular/core';

@Component({
  selector: 'input-invalid-email-error',
  template: `
    <span>
      {{'common.message1' | translate}} <strong>{{'common.valid' | translate}}</strong> email
    </span>
  `
})

export class InputInvalidEmailErrorComponent {}
