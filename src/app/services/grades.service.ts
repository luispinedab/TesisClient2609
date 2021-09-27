import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import {Grade} from '../models/Grade'

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getNivelCursos(){
    return this.http.get(`${this.API_URI}/NivelCursos`);
  }
  getIDNivelCurso(id:string){
    return this.http.get(`${this.API_URI}/NivelCursos/${id}`);
  }
  getCursos(){
    return this.http.get(`${this.API_URI}/Cursos`);
  }
  getCursosAll(){
    return this.http.get(`${this.API_URI}/cursosall`);
  }
  getCurso(id:string){
    return this.http.get(`${this.API_URI}/Cursos/${id}`);
  }
  deleteCursos(id: string|number){
    return this.http.delete(`${this.API_URI}/Cursos/${id}`)
  }
  saveCursos(usuario:Grade){
    return this.http.post(`${this.API_URI}/Cursos`,usuario);
  }
  updateCursos(id: string|number,updatedUsuario: Grade): Observable<Grade>{
    return this.http.put(`${this.API_URI}/Cursos/${id}`,updatedUsuario);
  }
}
