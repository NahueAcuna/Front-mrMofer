import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  
  readonly URL = "http://localhost:8080/reservations"

  constructor(private http:HttpClient){

   }

   getReservation(){
    return this.http.get<User[]>(this.URL);
   }
   postReservations(user: User){
    return this.http.post<User>(`${this.URL}`,user);
   }
   delete(id: number){
    return this.http.delete<User>(`${this.URL}/${id}`);
   }
   putReservation(id: number, user: User){
    return this.http.put<User>(`${this.URL}/${id}`,user);
   }
}
