import {
    NG_VALIDATORS,
    FormControl,
    ValidatorFn,
    Validator
} from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
    selector: '[emailvalidator][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true }
    ]
})
export class EmailValidator implements Validator {
    validator: ValidatorFn;
    constructor() {}
    validate(c: FormControl) {
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return regex.test(c.value) ? null : {
            emailvalidator: {
                valid: false
            }
        }
    }
}
