import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CashboxComponent } from './cashbox/cashbox.component';
import { LastTicketsComponent } from './cashbox/last-tickets/last-tickets.component';
import { DaysStatisticComponent } from './cashbox/days-statistic/days-statistic.component';
import { AbonementTicketComponent } from './cashbox/abonement-ticket/abonement-ticket.component';
import { TicketsStatisticComponent } from './admin/tickets-statistic/tickets-statistic.component';
import { MatchEditorComponent } from './admin/match-editor/match-editor.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { SeasonTicketComponent } from './admin/season-ticket/season-ticket.component';
import { PriceSchemaComponent } from './admin/price-schema/price-schema.component';
import { OrderDetailsComponent } from './admin/order-details/order-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { SettingComponent } from './auth/setting/setting.component';
import { MatchComponent } from './match/match.component';
import { SectorComponent } from './match/sector/sector.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SelectSectorComponent } from './match/select-sector/select-sector.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { CartGuard } from './auth/cart.guard';
// import { AdminGuard } from './auht/admin.guard';
// import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [CartGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'settings', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent },
  // { path: 'home',  component: HomeComponent, canActivate: [CartGuard]  },
  {path: 'sectors/:matchId/:tribuneId/:sectorId', component: SectorComponent, canActivate: [CartGuard] },
  { path: 'match/:matchId',  component: SelectSectorComponent, canActivate: [CartGuard] },
  { path: 'admin',  component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'admin'},
    children: [
      {path: '', redirectTo: 'ticketsStatistic', pathMatch: 'full'},
      {path: 'ticketsStatistic', component: TicketsStatisticComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'admin'} },
      {path: 'matchEditor', component: MatchEditorComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'admin'}},
      {path: 'adminUsers', component: AdminUsersComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'admin'}},
      {path: 'seasonTicket', component: SeasonTicketComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'admin'}},
      {path: 'priceSchema', component: PriceSchemaComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'admin'}},
      {path: 'orderDetails', component: OrderDetailsComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'admin'}}
    ]},
  { path: 'cashbox',  component: CashboxComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: ['admin', 'cashier']},
    children: [
    {path: '', redirectTo: 'daysStatistic', pathMatch: 'full'},
    {path: 'daysStatistic', component: DaysStatisticComponent, canActivate: [AuthGuard]},
    {path: 'lastTickets', component: LastTicketsComponent, canActivate: [AuthGuard]},
    {path: 'abonementTicket', component: AbonementTicketComponent, canActivate: [AuthGuard]}
  ] },
];
