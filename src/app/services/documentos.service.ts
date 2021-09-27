import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Documentos } from 'app/models/Documentos';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  API_URI = 'http://localhost:3000';

  constructor(private http:HttpClient) { }
  getDocumentos(){
    return this.http.get(`${this.API_URI}/Documentos`);
  }
  getDocumentobyID(tipo:any,id:any){
    return this.http.get(`${this.API_URI}/Documentos/tipo/${tipo}&${id}`)
  }
  saveDocumentos(documentos:Documentos){
    return this.http.post(`${this.API_URI}/Documentos`,documentos);
  }
  actualizarDocumentos(id:any,documento:Documentos){
    return this.http.put(`${this.API_URI}/Documentos/${id}`,documento);
  }
  getDocumentobyyear(tipo:any,id:any,año:any){
    return this.http.get(`${this.API_URI}/Documentos/year/${tipo}&${id}&${año}`)
  }
  getFormatsbyYear(año:any){
    return this.http.get(`${this.API_URI}/Format/${año}`)
  }
}
