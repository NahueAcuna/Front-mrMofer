import { ReservationDetails } from "./reservation-details";

export interface ReservationRequest{
    clientName: string;
    phoneNumber: string;
    startDate: string;
    endDate: string;
    details: ReservationDetails[];
    price: number;
}