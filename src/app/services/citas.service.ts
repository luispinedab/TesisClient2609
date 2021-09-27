import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Citas} from '../models/Citas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  getCitas(){
    return this.http.get(`${this.API_URI}/Citas`);
  }
  getCita(){
    return this.http.get(`${this.API_URI}/Cita`);
  }
  getCitabyAspirante(id: string|number){
    return this.http.get(`${this.API_URI}/CitasbyAspirante/${id}`);
  }
  saveCitas(citas:Citas){
    return this.http.post(`${this.API_URI}/Citas`,citas);
  }
  deleteCitas(id: string|number){
    return this.http.delete(`${this.API_URI}/Citas/${id}`)
  }
  updateCita(id: string|number,updatedInfoEstudiante: Citas): Observable<Citas>{
    return this.http.put(`${this.API_URI}/Citas/${id}`,updatedInfoEstudiante);
  }
}
