import { NgModule } from '@angular/core';
import { Routes, RouterModule, GuardsCheckEnd } from '@angular/router';
import { AdmisionComponent  } from './admision.component';
import { FormularioComponent } from './formulario/formulario.component';
import {CitasComponent} from './citas/citas.component';
import {SuccescitaComponent} from './succescita/succescita.component';
import { GuardsGuard } from 'app/shared/guards.guard';
import { DocyestGuard } from 'app/shared/docyest.guard';
import { SecyestGuard } from 'app/shared/secyest.guard';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';



const routes:Routes = [{
    path: '',
    component: AdmisionComponent,
    children: [
        {
            path: 'admision-formulario/:id',
            component: FormularioComponent,
            canActivate: [SecyestGuard]
        },
        {
            path: 'admision-formulario',
            component: FormularioComponent,
            canActivate: [GuardsGuard]
        },
        {
            path: 'admision-citas/:id',
            component: CitasComponent,
            canActivate: [GuardsGuard]
            
        },
        {
            path: 'success',
            component: SuccescitaComponent,
            canActivate: [GuardsGuard]
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdmisionRoutingModule{}
  export const routedComponents =[
      AdmisionComponent,
      FormularioComponent,
      CitasComponent,
      SuccescitaComponent,
      EvaluacionComponent
  ];