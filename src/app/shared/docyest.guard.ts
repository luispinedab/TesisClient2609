import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import decode from 'jwt-decode';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class DocyestGuard implements CanActivate {
  tipousuario: any;
  constructor (private router : Router, private auth:LoginService){
  }
  canActivate():  boolean {
    this.getValidRol();
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/auth/login']);      
        return false; 
      }
      else if(this.tipousuario=="Docente"||this.tipousuario=="Aspirante"){
        return true;
      }
      else{
        this.router.navigate(['/auth/login']);
        return false;
      }
  }
  getValidRol(){
    var token = localStorage.getItem('usuario');
    if(token!="null"){
      var tokenbyload:any = decode(token);
      this.tipousuario = tokenbyload.tipo;
    }
    
  } 
  
}
