import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router} from '@angular/router';
import decode from 'jwt-decode';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ComyestGuard implements CanActivate {
  tipousuario: any;
  constructor (private router : Router, private auth:LoginService){}
  canActivate( ): boolean {
    this.getValidRol();
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);      
      return false; 
    }
    else if(this.tipousuario=="Comite" || this.tipousuario=="Aspirante" ){
      console.log("Comite",this.tipousuario);
      return true;
    }
    else{
      this.router.navigate(['/auth/login']);
      console.log("No es Comite",this.tipousuario)
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
