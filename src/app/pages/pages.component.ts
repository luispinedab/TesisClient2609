import { Component,OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import decode from 'jwt-decode';
import { AspirantesService } from 'app/services/aspirantes.service';



@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{
  constructor(private aspiranteservice:AspirantesService){}
  activeAspirante:any
  ngOnInit(){
    var Token = localStorage.getItem('usuario');
    var activeAspirante=true;
var tokenbyload:any = decode(Token);
if(tokenbyload.tipo=='Aspirante')
{
  this.aspiranteservice.getAspirante(tokenbyload.idAspirante).subscribe(res=>{
    var aspirante:any =res;
    if(aspirante.UserState==1)
    {
      console.log("entro")
      activeAspirante=false;
      MENU_ITEMS[2].hidden=!activeAspirante;
      MENU_ITEMS[8].hidden=activeAspirante;
      this.menu = MENU_ITEMS;
    }
  })
}
console.log("page-menu",tokenbyload);
var tipousuario = tokenbyload.tipo;
    MENU_ITEMS[1].hidden=tipousuario!='Admin'?true:false;
    MENU_ITEMS[2].hidden=tipousuario!='Aspirante'?true:false;
    MENU_ITEMS[3].hidden=tipousuario!='Secretaria'?true:false;
    MENU_ITEMS[4].hidden=tipousuario!='Secretaria'?true:false;
    MENU_ITEMS[5].hidden=tipousuario!='Comite'?true:false;
    MENU_ITEMS[6].hidden=tipousuario!='Docente'?true:false;
    MENU_ITEMS[7].hidden=tipousuario!='Docente'?true:false;
    MENU_ITEMS[8].hidden=activeAspirante;
    MENU_ITEMS[9].hidden=tipousuario!='Docente'?true:false;
    this.menu = MENU_ITEMS;
  }
  menu;
}
