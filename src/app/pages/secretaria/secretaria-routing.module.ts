import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecretariaComponent  } from './secretaria.component';
import { HorarioComponent } from './horario/horario.component';
import {ReportesComponent} from './reportes/reportes.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {SuccesusuarioComponent} from './succesusuario/succesusuario.component';
import { AsignarcursosComponent } from './asignarcursos/asignarcursos.component';
import { MenucursosComponent } from './menucursos/menucursos.component';
import { RegistrarnotaComponent } from './registrarnota/registrarnota.component';
import { MenunotasComponent } from './menunotas/menunotas.component';
import { MenudocumentosComponent } from './menudocumentos/menudocumentos.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { VerdocsComponent } from './documentos/verdocs/verdocs.component';
import { MenuinfoComponent } from './menuinfo/menuinfo.component';
import { FormatoComponent } from './formato/formato.component';
import { MenupagoComponent } from './menupago/menupago.component';
import { EnablepagoComponent } from './enablepago/enablepago.component';
import { MenuformatComponent } from './menuformat/menuformat.component';
import { FormatMatriculaComponent } from './format-matricula/format-matricula.component';


const routes: Routes = [{
  path: '',
  component: SecretariaComponent,
  children: [
    {
      path: 'admision-horario',
      component: HorarioComponent
    },
    {
      path: 'descargarinfo',
      component: MenuinfoComponent
    },
    {
      path: 'descargarinfo/tabla',
      component: ReportesComponent
    },
    {
      path: 'crearusuario',
      component: UsuarioComponent
    },
    {
      path: 'succes',
      component: SuccesusuarioComponent
    },
    {
      path: 'asignarcursos',
      component: MenucursosComponent
    },
    {
      path: 'asignarcursos/tabla',
      component: AsignarcursosComponent
    },
    {
      path: 'registrarnota',
      component: MenunotasComponent
    },
    {
      path: 'registrarnota/tabla',
      component: RegistrarnotaComponent
    },
    {
      path: 'verDocumentos',
      component: MenudocumentosComponent
    },
    {
      path: 'verDocumentos/tabla',
      component: DocumentosComponent
    },
    {
      path: 'Documentos/:id',
      component:VerdocsComponent
    },
    {
      path: 'Formato',
      component:FormatoComponent
    },
    {
      path: 'menupago',
      component:MenupagoComponent
    },
    {
      path: 'pagomatricula',
      component:EnablepagoComponent
    },
    {
      path: 'MenuFormato',
      component:MenuformatComponent
    },
    {
      path: 'FotmatoEstudiantes',
      component:FormatMatriculaComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretariaRoutingModule { }

export const routedComponents = [
  SecretariaComponent,
  HorarioComponent,
  ReportesComponent,
  UsuarioComponent,
  AsignarcursosComponent,
  RegistrarnotaComponent,
  MenudocumentosComponent,
  DocumentosComponent,
  VerdocsComponent,
  MenuinfoComponent,
  FormatoComponent,
  MenupagoComponent,
  EnablepagoComponent,
  MenuformatComponent,
  FormatMatriculaComponent
];