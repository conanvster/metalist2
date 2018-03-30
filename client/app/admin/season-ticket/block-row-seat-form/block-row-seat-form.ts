import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import moment from 'moment-timezone';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'block-row-seat-form',
  template: `
    <form class="form" novalidate [formGroup]="form" [class.seat-exists]="isSeatExist">
      <mat-form-field>
        <input matInput name="sector" formControlName="sector" placeholder="Сектор"/>
      </mat-form-field>
      <mat-form-field>
        <input matInput name="row" formControlName="row" placeholder="Ряд"/>
      </mat-form-field>
      <mat-form-field *ngIf="isSeatExist">
        <input matInput name="seat" formControlName="seat" [placeholder]="'common.place' | translate"/>
      </mat-form-field>
      <mat-form-field>
        <input matInput [matDatepicker]="picker" formControlName="reservedUntil" name="reservedUntil"
               [placeholder]="'placeholder.reservedUntil' | translate">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <div class="button-container">
        <button type="submit" class="btn btn-default" (click)="onAdd()">{{'admin.add' | translate}}
        </button>
      </div>
    </form>
    <blockquote *ngIf="message">
      <p>{{message}}</p>
    </blockquote>
  `,
  styleUrls: ['./block-row-seat-form.css']
})

export class BlockRowSeatFormComponent implements OnInit{
  @Input() isSeatExist: boolean;
  @Input() message: string;
  @Output() add = new EventEmitter();
  date = moment(new Date(2018, 5, 30)).toISOString();
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      sector: new FormControl('', [Validators.required]),
      row: new FormControl('', [Validators.required]),
      seat: new FormControl('', [Validators.required]),
      reservedUntil: new FormControl(this.date, [Validators.required])
    });
  }

  onAdd = () => {
    this.add.emit(this.form.value);
    this.form.setValue({
      sector: '',
      row: '',
      seat: '',
      reservedUntil: this.date
    });
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
  }


}
