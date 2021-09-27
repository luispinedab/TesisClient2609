import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddobservacionesComponent  } from './addobservaciones/addobservaciones.component';
import {  VerobservacionesComponent} from './verobservaciones/verobservaciones.component';
import {  EditobservacionesComponent} from './editobservaciones/editobservaciones.component';
import {TablaverobservacionesComponent} from './tablaverobservaciones/tablaverobservaciones.component';
import {ObservacionesComponent} from './observaciones.component';
import { TablaeditarobservacionesComponent } from './tablaeditarobservaciones/tablaeditarobservaciones.component';
import { ComiteGuard } from 'app/shared/comite.guard';
import { ComyestGuard } from 'app/shared/comyest.guard';



const routes: Routes = [{
  path: '',
  component: ObservacionesComponent,
  children: [
    {
      path: 'observaciones-ver',
      component: VerobservacionesComponent,
      canActivate:[ComiteGuard]
    },
    {
      path: 'observaciones-ver/tabla',
      component: TablaverobservacionesComponent,
      canActivate:[ComyestGuard]
    },
    {
      path: 'observaciones-add',
      component: AddobservacionesComponent,
      canActivate:[ComiteGuard]
    },
    {
      path: 'observaciones-add/:id',
      component: AddobservacionesComponent,
      canActivate:[ComiteGuard]
    },
    {
      path: 'observaciones-edit',
      component: EditobservacionesComponent,
      canActivate:[ComiteGuard]
      
    },
    {
      path: 'observaciones-edit/tabla',
      component: TablaeditarobservacionesComponent,
      canActivate:[ComiteGuard]
      
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservacionesRoutingModule { }

export const routedComponents = [
  AddobservacionesComponent,
  EditobservacionesComponent,
  VerobservacionesComponent,
];