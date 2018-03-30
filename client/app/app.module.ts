import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CookieService } from 'angular2-cookie';
import { RouterModule, PreloadAllModules} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
// import { NgForm, Validators} from '@angular/forms';
// import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { CashboxModule } from './cashbox/cashbox.module';
import { AdminModule } from './admin/admin.module';

import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { AdminGuard } from './auth/admin.guard';
import { CartGuard } from './auth/cart.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CashboxComponent } from './cashbox/cashbox.component';
import { FooterComponent } from './footer/footer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatchComponent } from './match/match.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuhtComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { OauthButtonComponent } from './auth/oauth-buttons/oauth-buttons.component';
import { SettingComponent } from './auth/setting/setting.component';
import { MatchDetailsComponent } from './match/match-details/match-details.component';
import { SectorComponent } from './match/sector/sector.component';
import { SelectSectorComponent } from './match/select-sector/select-sector.component';
import { SummaryComponent } from './cart/summary/summary.component';
import { DetailsComponent } from './cart/details/details.component';
import { ConfirmEmailFormComponent } from './auth/confirm-email-form/confirm-email-form';
import { NavpanelComponent } from './navpanel/navpanel.component';
import { MatchCardComponent } from './home/match-card/match-card.component';
import { SharedFormComponent } from './auth/shared-form/shared-form.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UtilService } from './services/util.service';
import { CashboxService } from './cashbox/cashbox.service';
import { TicketService } from './services/ticket.service';
import { PrintTicketService } from './services/print-ticket.service';
import { CartService } from './services/cart.service';
import { SeasonTicketService } from './services/season-ticket.service';
import { FileService } from './services/file.service';
import { PriceSchemaService } from './services/price-schema.service';
import { MatchEditorService } from './services/match-editor.service';
import { MatchService } from './services/match.service';
import {TeamLogosService} from './services/team-logos.service';
import {SharedDataService} from './services/shared-data.service';

import { EmailValidator } from './directives/email-validator.directive';
import { TooltipDirective } from './directives/tooltip.directive';

import { SwiperModule } from 'angular2-useful-swiper';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

import { ScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    TicketsComponent,
    CashboxComponent,
    FooterComponent,
    CheckoutComponent,
    NavbarComponent,
    AuhtComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    OauthButtonComponent,
    SettingComponent,
    MatchComponent,
    MatchDetailsComponent,
    NavpanelComponent,
    SectorComponent,
    SelectSectorComponent,
    SummaryComponent,
    DetailsComponent,
    ConfirmEmailFormComponent,
    MatchCardComponent,
    SharedFormComponent,
    // custom directive
    EmailValidator,
    TooltipDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // FormGroupDirective,
    // ErrorStateMatcher,
    // NgForm,
    // Validators,
    // RouterModule.forRoot(ROUTES, {enableTracing: true})
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    CashboxModule,
    AdminModule,
    SwiperModule,
    ScrollbarModule
  ],
  providers: [AuthGuard,
    CookieService,
    AuthService,
    UserService,
    UtilService,
    CashboxService,
    TicketService,
    PrintTicketService,
    CartService,
    RoleGuard,
    AdminGuard,
    CartGuard,
    SeasonTicketService,
    FileService,
    PriceSchemaService,
    MatchEditorService,
    MatchService,
    TeamLogosService,
    SharedDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
