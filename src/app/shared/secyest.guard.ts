import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router} from '@angular/router';
import decode from 'jwt-decode';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SecyestGuard implements CanActivate {
  tipousuario: any;
  constructor (private router : Router, private auth:LoginService){}
  canActivate(): boolean {
    this.getValidRol();
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/auth/login']);      
        return false; 
      }
      else if(this.tipousuario=="Secretaria" || this.tipousuario=="Aspirante"){
        console.log("Secretaria",this.tipousuario);
        return true;
      }
      else{
        this.router.navigate(['/auth/login']);
        console.log("No es Secretaria",this.tipousuario)
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
