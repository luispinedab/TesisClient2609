import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  API_URI = 'http://localhost:3000';
  profileUrl: Observable<string | null>;

  constructor(private http:HttpClient,private storage: AngularFireStorage) { 
    
  }
  getArchivos(nombre:string){
    const ref = this.storage.ref(nombre);
    return this.storage.ref(nombre);

  }
  SubirArchivos(nombre:string,data:any){
    return this.storage.upload(nombre,data);
  }
}
