import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.less']
})
export class SharedFormComponent implements OnInit {
  form: FormGroup;
  fields: string[] = [];
  showError = true;
  @Input() hide: boolean;
  @Input() type: string;
  @Output() submit = new EventEmitter();
  constructor() {}
  ngOnInit() {
    this.getFields();
    this.form = this.generateForm();
  }

  generateForm = () => {
    const controlsConfig = {};
    const validatorsConfig = this.fields.includes('confirmPassword') ?
      { validators: this.matchingPasswords } : {};
    this.fields.forEach(field => controlsConfig[field] = this.getFormControl(field));
    return new FormGroup(controlsConfig, validatorsConfig);
  }
  getFields = () => {
    switch (this.type) {
      case 'login':
      case 'email-confirmation':
        this.fields = ['email', 'password'];
        break;
      case 'register':
        this.fields = ['name', 'email', 'password', 'confirmPassword', 'subscribeNews'];
        break;
      case 'recovery':
        this.fields = ['email'];
        break;
      case 'settings':
        this.fields = ['currentPassword', 'newPassword', 'confirmPassword'];
        break;
    }
  }
  getFormControl(field) {
    switch (field) {
      case 'email':
        return this.requiredEmailField;
      case 'subscribeNews':
        return this.field;
      default:
        return this.requiredField;
    }
  }

  private get requiredField () {
    return new FormControl('', [Validators.required]);
  }
  private get requiredEmailField () {
    return new FormControl('', [Validators.required, Validators.email]);
  }
  private get field () {
    return new FormControl('');
  }
  getInputType = (field) => {

    switch (field) {
      case 'name':
        return 'text';
      case 'email':
        return 'email';
      case 'subscribeNews':
        return 'checkbox';
      default:
        return 'password';
    }
  }
  handleSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.showError = true;

    this.submit.emit(this.form.value);
  }

  getInputError(field) {
    return this.form.get(field).errors && this.form.get(field).touched ? Object.keys(this.form.get(field).errors) : [];
  }

  handleFocus() {
    this.showError = false;
  }

  matchingPasswords(formGroup: FormGroup) {
    const { password, newPassword, confirmPassword } = formGroup.value;
    const firstPassword = password || newPassword;
    if (!firstPassword || !confirmPassword) {
      return;
    }
    if (firstPassword !== confirmPassword) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}

