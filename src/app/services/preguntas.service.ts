import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  getPreguntas(id:string){
    return this.http.get(`${this.API_URI}/preguntas/curso/${id}`);
  }
  getRespuestas(id:string){
    return this.http.get(`${this.API_URI}/Respuestas/${id}`);
  }
}
