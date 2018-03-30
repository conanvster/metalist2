import {Seat} from "./seat.interface";

export interface Cart {
  seats: Seat[],
  price?: number,
  size: number,
  id: string,
}