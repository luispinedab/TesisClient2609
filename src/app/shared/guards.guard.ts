import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import decode from 'jwt-decode';
import {LoginService} from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  tipousuario: any;
  constructor (private router : Router, private auth:LoginService){
    
  }
  canActivate(): boolean  {
    this.getValidRol();
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/auth/login']);      
        return false; 
      }
      else if(this.tipousuario=="Aspirante"){
        console.log("administrador",this.tipousuario);
        return true;
      }
      else{
        this.router.navigate(['/auth/login']);
        console.log("noesadmin",this.tipousuario)
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
