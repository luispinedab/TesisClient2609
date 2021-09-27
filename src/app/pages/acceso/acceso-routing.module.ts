import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccesoComponent  } from './acceso.component';
import {LoginComponent} from './login/login.component';
import {RespasswordComponent} from './respassword/respassword.component';
import {HomeComponent} from './home/home.component';



const routes: Routes = [{
  path: '',
  component: AccesoComponent,
  children: [
    {
      path: 'acceso-login',
      component: LoginComponent,
      
    },
    {
      path: 'acceso-resspasword',
      component: RespasswordComponent,
      
    }
    ,
    {
      path: 'acceso-home',
      component: HomeComponent,
      
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoRoutingModule { }

export const routedComponents = [
  AccesoComponent,
  LoginComponent,
  RespasswordComponent,
  HomeComponent
];