import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observaciones} from '../models/Observacion'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesService {

  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  getObservaciones(){
    return this.http.get(`${this.API_URI}/Observaciones`);
  }
  gettipofaltas(){
    return this.http.get(`${this.API_URI}/TipoFaltas`);
  }
  getfaltas(){
    return this.http.get(`${this.API_URI}/Faltas`);
  }
  getfaltas_tipoFaltas(id:string){
    return this.http.get(`${this.API_URI}/Faltas/${id}`);
  }
  getObservacion(id:string){
    return this.http.get(`${this.API_URI}/Observaciones/${id}`);
  }
  deleteUsuario(id: string|number){
    return this.http.delete(`${this.API_URI}/Usuarios/${id}`)
  }
  saveObservacion(observacion:Observaciones){
    return this.http.post(`${this.API_URI}/Observaciones`,observacion);
  }
  updateobservacion(id: string|number,updatedObservaciones: Observaciones): Observable<Observaciones>{
    return this.http.put(`${this.API_URI}/Observaciones/${id}`,updatedObservaciones);
  }
  getObservaciones_ver(año:any,Periodo:any,Estudiante:any){
    return this.http.get(`${this.API_URI}/Observaciones/menu/${año}&${Periodo}&${Estudiante}`);
  }
}
