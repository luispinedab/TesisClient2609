import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultarfallasComponent } from './consultarfallas/consultarfallas.component';
import { ConsultarnotasComponent } from './consultarnotas/consultarnotas.component';
import { ConsultarobservacionComponent } from './consultarobservacion/consultarobservacion.component';
import {EstudianteComponent} from './estudiante.component';
import { TablaconsultarnotasComponent } from './tablaconsultarnotas/tablaconsultarnotas.component';




const routes: Routes = [{
  //crear guard Estudiante
  path: '',
  component: EstudianteComponent,
  children: [
    {
      path: 'Consultarfallas',
      component: ConsultarfallasComponent,
    },
    {
      path: 'Consultarobservaciones',
      component: ConsultarobservacionComponent,
    },
    {
      path: 'Consultarnotas',
      component: ConsultarnotasComponent,
    },
    {
      path: 'Consultarnotas/tabla',
      component: TablaconsultarnotasComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteRoutingModule { }

export const routedComponents = [
  ConsultarfallasComponent,
  ConsultarobservacionComponent,
  ConsultarnotasComponent,
  TablaconsultarnotasComponent
];