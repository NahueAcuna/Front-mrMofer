import { ReservationDetails } from "./reservation-details";
import { User } from "./user";

export interface Reservation{
    id?: number;
    user: User;
    reservationDetails: ReservationDetails[];
    createDate?: string;
    startDate: string;
    endDate: string;
    price: number;
    status?: string;
}