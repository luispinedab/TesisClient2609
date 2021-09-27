import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  
  API_URI = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getDepartamentos(){
    return this.http.get(`${this.API_URI}/Departamentos`);
  }
  getCiudades(){
    return this.http.get(`${this.API_URI}/Lugares`);
  }
  getCiudad(id:string){
    return this.http.get(`${this.API_URI}/Lugares/${id}`);
  }
}
