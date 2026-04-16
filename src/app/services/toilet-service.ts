import { Injectable } from '@angular/core';
import { Toilet } from '../models/toilet';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ToiletService {

  readonly URL = "http://localhost:8080/toilets"
  toilets : Toilet[]
  
  constructor(private http: HttpClient){
    this.toilets = [];
  }
  getAll(){
    return this.http.get<Toilet[]>(this.URL);
  }
  getById(id: number){
    return this.http.get<Toilet>(`${this.URL}/${id}`);
  }
  post(toilet: Toilet){
    return this.http.post<Toilet>(`${this.URL}`,toilet);
  }
  put(id: number,toilet: Toilet){
    return this.http.put<Toilet>(`${this.URL}/${id}`,toilet);
  }
  delete(id: number){
    return this.http.delete<Toilet>(`${this.URL}/${id}`);
  }
  patch(id: number, isActive: boolean){
    return this.http.patch(`${this.URL}/${id}`,isActive);
  }
  
  
}
