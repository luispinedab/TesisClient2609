import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {InfoEstudiante} from '../models/InfoEstudiante'
import {infoallestudiante} from '../models/infoallstudent';

import {ExperienciasEscolares} from '../models/ExperienciasEscolares'
import {Hermanos} from '../models/Hermanos'
import { Observable } from 'rxjs';
import { updateInfoStudents } from 'app/models/updateInfoStudents';
@Injectable({
  providedIn: 'root'
})
export class InfoestudianteService {
  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  getInfoEstudiantes(){
    return this.http.get(`${this.API_URI}/Infoestudiantes`);
  }
  getlastinfoEstudiante(){
    return this.http.get(`${this.API_URI}/LastInfoestudiante`);
  }
  getExperienciasEscolares(){
    return this.http.get(`${this.API_URI}/ExperienciasEscolares`);
  }
  getExperienciaEscolar(id:string){
    return this.http.get(`${this.API_URI}/ExperienciasEscolares/${id}`);
  }
  getHermanos(){
    return this.http.get(`${this.API_URI}/Hermanos`);
  }
  getHermano(id:string){
    return this.http.get(`${this.API_URI}/Hermanos/${id}`);
  }
  saveExperienciasEscolares(experiencias:ExperienciasEscolares){
    return this.http.post(`${this.API_URI}/ExperienciasEscolares`,experiencias);
  }
  saveHermanos(hermanos:Hermanos){
    return this.http.post(`${this.API_URI}/Hermanos`,hermanos);
  }
  getInfoEstudiante(id:string){
    return this.http.get(`${this.API_URI}/Infoestudiantes/${id}`);
  }
  getInfoEstudiantebyaspirante(id:string){
    return this.http.get(`${this.API_URI}/Infoestudiantes/aspirante/${id}`);
  }
  deleteInfoEstudiante(id: string|number){
    return this.http.delete(`${this.API_URI}/Infoestudiantes/${id}`)
  }
  saveInfoEstudiante(infoEstudiante:infoallestudiante){
    return this.http.post(`${this.API_URI}/Infoallestudiantes`,infoEstudiante);
  }
  updateInfoEstudiante(id: string|number,updatedInfoEstudiante: InfoEstudiante){
    return this.http.put(`${this.API_URI}/Infoestudiantes/${id}`,updatedInfoEstudiante);
  }
  getInfoestudiantes_grade(curso: any,año:any){
    return this.http.get(`${this.API_URI}/Infoestudiantes/grade/${curso}&${año}`);
  }
  getInfoestudiantes_grade1(curso: any,año:any){
    return this.http.get(`${this.API_URI}/Infoestudiantes/grade1/${curso}&${año}`);
  }
  getListadoID(curso: any,año:any){
    return this.http.get(`${this.API_URI}/Infoestudiantes/id/${curso}&${año}`);
  }
  getYears(){
    return this.http.get(`${this.API_URI}/Infoestudiantes/year`);
  }
  getInfoestudiantes_curso(curso: any,año:any){
    return this.http.get(`${this.API_URI}/Infoestudiantes/curso/${curso}&${año}`);
  }
  updateInfoStudents(usuario:updateInfoStudents){
    return this.http.post(`${this.API_URI}/updateinfoestudiantes`,usuario);
  }
  updateNotas(updatedNota:any[]){
    return this.http.put(`${this.API_URI}/Infoestudiantes/notas`,updatedNota);
  }
}
