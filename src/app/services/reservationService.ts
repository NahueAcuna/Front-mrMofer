import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { ReservationRequest } from '../models/ReservationRequest';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  
   readonly URL = "http://localhost:8080/reservations"
   reservations: ReservationRequest[];

   constructor(private http:HttpClient){
    this.reservations = []
   }

   getReservation(){
    return this.http.get<ReservationRequest[]>(this.URL);
   }
   postReservations(reservation: ReservationRequest){
    return this.http.post<ReservationRequest>(`${this.URL}`,reservation);
   }
   delete(id: number){
    return this.http.delete<ReservationRequest>(`${this.URL}/${id}`);
   }
   putReservation(id: number, reservation: ReservationRequest){
    return this.http.put<ReservationRequest>(`${this.URL}/${id}`,reservation);
   }
}
