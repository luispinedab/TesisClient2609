import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Achievement} from '../models/Achievement';
import { AssignedAchievement } from 'app/models/AssignedAchievement';
import { Nota } from 'app/models/Notas';
import { Falla } from 'app/models/Falla';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getNivelCursos(){
    return this.http.get(`${this.API_URI}/NivelCursos`);
  }
  getAsignaturas(){
    return this.http.get(`${this.API_URI}/asignaturas`);
  }
  getLogros(){
    return this.http.get(`${this.API_URI}/logros`);
  }
  getLogro(id:string){
    return this.http.get(`${this.API_URI}/logros/${id}`);
  }
  deleteLogros(id: string|number){
    return this.http.delete(`${this.API_URI}/logros/${id}`)
  }
  saveLogros(usuario:Achievement){
    return this.http.post(`${this.API_URI}/logros`,usuario);
  }
  updateLogros(id: string|number,updatedLogro: Achievement): Observable<Achievement>{
    return this.http.put(`${this.API_URI}/logros/${id}`,updatedLogro);
  }
  getLogrosAsignados(){
    return this.http.get(`${this.API_URI}/logrosasignados`);
  }
  saveLogrosAsignados(usuario:AssignedAchievement){
    return this.http.post(`${this.API_URI}/logrosasignados`,usuario);
  }
  getlogros_asignar(level:any,materia:any){
    return this.http.get(`${this.API_URI}/logros/menu/${level}&${materia}`);
  }
  getassignedLogros_menu(Periodo:any,materia:any){
    return this.http.get(`${this.API_URI}/logros/menu1/${Periodo}&${materia}`);
  }
  getNotas(){
    return this.http.get(`${this.API_URI}/notas`);
  }
  saveNotas(usuario:Nota[]){
    return this.http.post(`${this.API_URI}/notas`,usuario);
  }
  updateNotas(updatedNota:any[]): Observable<Achievement>{
    return this.http.put(`${this.API_URI}/notas`,updatedNota);
  }
  getNotasbyMateria(Periodo:any,Grade:any,materia:any){
    return this.http.get(`${this.API_URI}/notas/materia/${Periodo}&${Grade}&${materia}`);
  }
  getNotasbyEstudiante(Periodo:any,Grade:any,Estudiante:any){
    return this.http.get(`${this.API_URI}/notas/estudiante/${Periodo}&${Grade}&${Estudiante}`);
  }
  getFallas(){
    return this.http.get(`${this.API_URI}/fallas`);
  }
  saveFallas(usuario:Falla){
    return this.http.post(`${this.API_URI}/fallas`,usuario);
  }
  getFallasbyGrade(Periodo:any,Grade:any){
    return this.http.get(`${this.API_URI}/fallas/curso/${Periodo}&${Grade}`);
  }
  getFallasbyStudent(Periodo:any,Estudiante:any){
    return this.http.get(`${this.API_URI}/fallas/estudiante/${Periodo}&${Estudiante}`);
  }
  getNotasbyGrad(curso: any,año:any,periodo:any){
    return this.http.get(`${this.API_URI}/reportes/${curso}&${año}&${periodo}`);
  }
  getpromedio(curso: any,año:any,periodo:any){
    return this.http.get(`${this.API_URI}/promedio/${curso}&${año}&${periodo}`);
  }
  gettotalfallas(curso: any,año:any,periodo:any){
    return this.http.get(`${this.API_URI}/totalfallas/${curso}&${año}&${periodo}`);
  }
  getlogrosbyGrad(curso: any,año:any,periodo:any){
    return this.http.get(`${this.API_URI}/logrosasignados/reporte/${curso}&${año}&${periodo}`);
  }
}
