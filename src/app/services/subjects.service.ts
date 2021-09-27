import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Subject} from '../models/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
   API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getUsuarios(){
    return this.http.get(`${this.API_URI}/Usuarios`);
  }
  getNombreAsignaturas(){
    return this.http.get(`${this.API_URI}/NombreAsignaturas`);
  }
  getAreas(){
    return this.http.get(`${this.API_URI}/Area`);
  }
  getCursos(){
    return this.http.get(`${this.API_URI}/Cursos`);
  }
  getAsignaturas(){
    return this.http.get(`${this.API_URI}/asignaturas`);
  }
  getAsignatura(id:string){
    return this.http.get(`${this.API_URI}/asignaturas/${id}`);
  }
  deleteAsignaturas(id: string|number){
    return this.http.delete(`${this.API_URI}/asignaturas/${id}`)
  }
  saveAsignaturas(usuario:Subject){
    return this.http.post(`${this.API_URI}/asignaturas`,usuario);
  }
  updateAsignaturas(id: string|number,updatedAsignatura: Subject): Observable<Subject>{
    return this.http.put(`${this.API_URI}/asignaturas/${id}`,updatedAsignatura);
  }
}
