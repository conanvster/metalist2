import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {CdkTableModule} from '@angular/cdk/table';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../shared/shared.module';

import {TicketsStatisticComponent} from './tickets-statistic/tickets-statistic.component';
import {MatchEditorComponent} from './match-editor/match-editor.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {SeasonTicketComponent} from './season-ticket/season-ticket.component';
import {PriceSchemaComponent} from './price-schema/price-schema.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {EditMatchComponent} from './match-editor/edit-match/edit-match.component';
import {MatchListComponent} from './match-editor/match-list/match-list.component';
import {DeleteItemComponent} from './delete-item/delete-item.component';
import {SeasonTicketListComponent} from './season-ticket/season-ticket-list/season-ticket-list.component';
import {BlockRowListComponent} from './season-ticket/block-row-list/block-row-list.component';
import {EventsSummaryComponent} from './tickets-statistic/events-summary/events-summary.component';
import {DaysSummaryComponent} from './tickets-statistic/days-summary/days-summary.component';
import {ColorSchemaEditorComponent} from './price-schema/edit-price-schema/color-schema-editor/color-schema-editor.component';
import {PriceSchemaMenuComponent} from './price-schema/price-schema-menu/price-schema-menu.component';
import {StadiumWithTribunesComponent} from './price-schema/edit-price-schema/stadium-with-tribunes/stadium-with-tribunes.component';
import {PriceEditorComponent} from './price-schema/edit-price-schema/stadium-with-tribunes/price-editor/price-editor.component';
import {EditPriceSchemaComponent} from './price-schema/edit-price-schema/edit-price-schema.component';
import {BlockRowSeatTableComponent} from './season-ticket/block-row-seat-table/block-row-seat-table';
import {BlockRowSeatFormComponent} from './season-ticket/block-row-seat-form/block-row-seat-form';
import { ListItemComponent } from './list-item/list-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CdkTableModule,
    ReactiveFormsModule,
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
    SharedModule,
    TranslateModule.forChild(),
  ],
  declarations: [TicketsStatisticComponent, MatchEditorComponent, AdminUsersComponent, SeasonTicketComponent,
    PriceSchemaComponent, OrderDetailsComponent, EditMatchComponent, SeasonTicketListComponent, BlockRowListComponent,
    EventsSummaryComponent, DaysSummaryComponent, ColorSchemaEditorComponent, PriceSchemaMenuComponent,
    StadiumWithTribunesComponent, PriceEditorComponent, MatchListComponent, DeleteItemComponent,
    EditPriceSchemaComponent, BlockRowSeatTableComponent, BlockRowSeatFormComponent, ListItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {
}
