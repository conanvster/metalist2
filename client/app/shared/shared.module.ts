import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule
} from '@angular/material';
import { StadiumComponent } from './stadium/stadium.component';
import { InputRequiredErrorComponent } from './form-fields/input-required-error.component';
import {TranslateModule} from '@ngx-translate/core';
import {InputInvalidEmailErrorComponent} from './form-fields/input-invalid-email-error.component';
import {LocaleDatePipe} from '../pipes/locale-date.pipe';
import {LogoCircleComponent} from './logo-circle/logo-circle.components';
import {TicketItemComponent} from './ticket-item/ticket-item.component';
import {CircleTabComponent} from './circle-tab/circle-tab.component';
import {TicketSectionComponent} from './ticket-section/ticket-section.component';
import {HomeButtonComponent} from './home-button/home-button.component';
import {PriceCategoryComponent} from './price-category/price-category.component';
import {BackButtonComponent} from './back-button/back-button.component';
import {LegendComponent} from './legend/legend.component';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule
  ],
  declarations: [
    StadiumComponent,
    InputRequiredErrorComponent,
    InputInvalidEmailErrorComponent,
    LogoCircleComponent,
    TicketItemComponent,
    CircleTabComponent,
    TicketSectionComponent,
    HomeButtonComponent,
    BackButtonComponent,
    PriceCategoryComponent,
    LegendComponent,
    LocaleDatePipe
  ],
  exports: [
    StadiumComponent,
    InputRequiredErrorComponent,
    InputInvalidEmailErrorComponent,
    LogoCircleComponent,
    TicketItemComponent,
    CircleTabComponent,
    TicketSectionComponent,
    HomeButtonComponent,
    BackButtonComponent,
    PriceCategoryComponent,
    LegendComponent,
    LocaleDatePipe,
  ],
})
export class SharedModule { }
