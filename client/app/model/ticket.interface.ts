import {Seat} from './seat.interface';
import {Match} from './match.interface';

export interface Ticket {
  accessCode: string,
  amount: number,
  seat: Seat,
  match: Match
}
