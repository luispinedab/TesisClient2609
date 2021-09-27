import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import {AdministrarGuard} from '../shared/administrar.guard';
import {SecretariaGuard} from '../shared/secretaria.guard';
import { GuardsGuard } from 'app/shared/guards.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'administrar',
      loadChildren: () => import('./administrar/administrar.module')
      .then(m => m.AdministrarModule),
      canActivate: [AdministrarGuard]
    },
    {
      path: 'admision',
      loadChildren: () => import('./admision/admision.module')
      .then(m => m.AdmisionModule),
      
    },
    {
      path: 'acceso',
      loadChildren: () => import('./acceso/acceso.module')
      .then(m => m.AccesoModule)
    },
    {
      path: 'secretaria',
      loadChildren: () => import('./secretaria/secretaria.module')
      .then(m => m.SecretariaModule),
      canActivate:[SecretariaGuard]
    },
    {
      path: 'comite',
      loadChildren: () => import('./comite/observaciones.module')
      .then(m => m.ObservacionesModule)
    },
    {
      path: 'docente',
      loadChildren: () => import('./docente/docente.module')
      .then(m => m.DocenteModule)
    },
    {
      path: 'estudiante',
      loadChildren: () => import('./estudiante/estudiante.module')
      .then(m => m.EstudianteModule),
      //Crear Guard Estudiante
      canActivate:[GuardsGuard]
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
