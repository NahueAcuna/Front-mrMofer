import { Reservation } from "./Reservation";
import { Toilet } from "./toilet";

export interface ReservationDetails {
    id?: number;
    toilet: Toilet;
    reservationId: number; 
    quantiy: number;
}
