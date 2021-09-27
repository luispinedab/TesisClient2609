import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Aspirantes} from '../models/Aspirtantes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AspirantesService {

  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
 
  getAspirantes(){
    return this.http.get(`${this.API_URI}/Aspirantes`);
  }
  getAspirante(id:string){
    return this.http.get(`${this.API_URI}/Aspirantes/${id}`);
  }
  deleteAspirante(id: string|number){
    return this.http.delete(`${this.API_URI}/Aspirantes/${id}`)
  }
  saveAspirante(Aspirante:Aspirantes){
    return this.http.post(`${this.API_URI}/Aspirantes`,Aspirante);
  }
  updateAspirante(id: string|number,updatedAspirante: Aspirantes): Observable<Aspirantes>{
    return this.http.put(`${this.API_URI}/Aspirantes/${id}`,updatedAspirante);
  }
  updatestateAspirante(id: string|number,updatedAspirante: Aspirantes): Observable<Aspirantes>{
    return this.http.put(`${this.API_URI}/Aspirantes/state/${id}`,updatedAspirante);
  }
  updateApirantes(usuario:any[]){
    return this.http.post(`${this.API_URI}/updateAspirantes`,usuario);
  }
  updateApirantesProm(usuario:any[]){
    return this.http.post(`${this.API_URI}/updateAspirantesprom`,usuario);
  }
}
