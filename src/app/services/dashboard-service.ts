import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { kpi } from '../models/Dashboard/kpis';
import { revenueTrends } from '../models/Dashboard/revenue-trends';
import { MonthlyReservation } from '../models/Dashboard/MonthlyReservation';
import { MonthlyToiletTypeReserved } from '../models/Dashboard/MonthlyToiletTypeReserved';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  
   readonly URL = "http://localhost:8080/dashboard"

  constructor(private http : HttpClient){

  }

  getKpis(){
    return this.http.get<kpi>(`${this.URL}/kpis`);
  }
  getRevenueTrends(){
    return this.http.get<revenueTrends[]>(`${this.URL}/revenue-trends`);
  }
  getMonthlyReservations(){
    return this.http.get<MonthlyReservation[]>(`${this.URL}/reservations`);
  }
  getToiletTypeReserved(){
    return this.http.get<MonthlyToiletTypeReserved[]>(`${this.URL}/toilet-type-reserved`);
  }
  getToiletTypes(){
    return this.http.get<string[]>(`${this.URL}/toilet-types`);
  }
}
