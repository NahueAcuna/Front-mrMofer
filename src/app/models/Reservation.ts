import { ReservationDetails } from "./reservation-details";
import { ReservationDetailsRequest } from "./ReservationDetailsRequest";
import { User } from "./user";

export interface Reservation{
    id?: number;
    user: User;
    reservationDetails: ReservationDetailsRequest[];
    createDate?: string;
    startDate: string;
    endDate: string;
    price: number;
    status?: string;
}