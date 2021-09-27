import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocenteGuard } from 'app/shared/docente.guard';
import { DocyestGuard } from 'app/shared/docyest.guard';
import {ReportesComponent1} from '../docente/menureportes/reportes/reportes.component'
import { AsignarlogrosComponent } from './asignarlogros/asignarlogros.component';
import {DocenteComponent} from './docente.component';
import { FallasComponent } from './fallas/fallas.component';
import { MenupromocionComponent } from './menupromocion/menupromocion.component';
import { MenureportesComponent } from './menureportes/menureportes.component';
import { NotasComponent } from './notas/notas.component';
import { PromocionComponent } from './promocion/promocion.component';
import { TablafallasComponent } from './tablafallas/tablafallas.component';
import { VerComponent } from './tablafallas/ver/ver.component';
import { TablalogrosComponent } from './tablalogros/tablalogros.component';
import { TablanotasComponent } from './tablanotas/tablanotas.component';




const routes: Routes = [{
  path: '',
  component: DocenteComponent,
  children: [
    {
      path: 'Asignarlogros',
      component: AsignarlogrosComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Asignarlogros/tabla',
      component: TablalogrosComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Notas',
      component: NotasComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Notas/tabla',
      component: TablanotasComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Fallas',
      component: FallasComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Fallas/tabla',
      component: TablafallasComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Fallas/tabla-ver',
      component: VerComponent,
      canActivate:[DocyestGuard]
    },
    {
      path: 'Reportes',
      component: MenureportesComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Promocion/tabla',
      component: PromocionComponent,
      canActivate:[DocenteGuard]
    },
    {
      path:'Promocion',
      component: MenupromocionComponent,
      canActivate:[DocenteGuard]
    },
    {
      path: 'Reportes/boletin_nuevo',
      component: ReportesComponent1,
      canActivate:[DocenteGuard]
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteRoutingModule { }

export const routedComponents = [
  AsignarlogrosComponent,
  TablalogrosComponent,
  NotasComponent,
  TablanotasComponent,
  FallasComponent,
  TablafallasComponent,
  VerComponent,
  MenureportesComponent,
  ReportesComponent1
];