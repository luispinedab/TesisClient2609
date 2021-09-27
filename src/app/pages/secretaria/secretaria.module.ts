import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {NbPopoverModule,NbTreeGridModule,NbCardModule, NbIconModule, NbInputModule, NbStepperModule,NbSelectModule,NbDatepickerModule,NbButtonModule,NbActionsModule,NbUserModule,NbCheckboxModule,NbRadioModule, NbListModule, NbSpinnerModule, NbToastrModule,} from '@nebular/theme';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NbDateFnsDateModule} from '@nebular/date-fns';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { SecretariaRoutingModule, routedComponents } from './secretaria-routing.module';
import { HorarioComponent } from './horario/horario.component';
import {NbAlertModule} from '@nebular/theme';
import { ReportesComponent } from './reportes/reportes.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SuccesusuarioComponent } from './succesusuario/succesusuario.component';
import { AsignarcursosComponent } from './asignarcursos/asignarcursos.component';
import { MenucursosComponent } from './menucursos/menucursos.component';
import { AsignarComponent } from './asignarcursos/asignar/asignar.component';
import { RegistrarnotaComponent } from './registrarnota/registrarnota.component';
import { MenunotasComponent } from './menunotas/menunotas.component';
import { MenudocumentosComponent } from './menudocumentos/menudocumentos.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { VerdocsComponent } from './documentos/verdocs/verdocs.component';
import { MenuinfoComponent } from './menuinfo/menuinfo.component';
import { FormatoComponent } from './formato/formato.component';
import { MenupagoComponent } from './menupago/menupago.component';
import { EnablepagoComponent } from './enablepago/enablepago.component';
import { FormatMatriculaComponent } from './format-matricula/format-matricula.component';
import { MenuformatComponent } from './menuformat/menuformat.component';


FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin
])
@NgModule({
    imports: [
        CommonModule,
        NbToastrModule.forRoot(),
        NbSpinnerModule,
        NbListModule,
        NbCardModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        Ng2SmartTableModule,
        SecretariaRoutingModule,
        NbStepperModule,
        NbSelectModule,
        NbDatepickerModule,
        NbDateFnsDateModule,
        ThemeModule,
        NbButtonModule,
        NbActionsModule,
        NbUserModule,
        NbCheckboxModule,
        NbRadioModule,
        ReactiveFormsModule,
        FormsModule,
        NbPopoverModule,
        NbAlertModule,
        FullCalendarModule
    ],
    declarations: [
        ...routedComponents,
        HorarioComponent,
        ReportesComponent,
        UsuarioComponent,
        SuccesusuarioComponent,
        AsignarcursosComponent,
        MenucursosComponent,
        AsignarComponent,
        RegistrarnotaComponent,
        MenunotasComponent,
        MenudocumentosComponent,
        DocumentosComponent,
        VerdocsComponent,
        MenuinfoComponent,
        FormatoComponent,
        MenupagoComponent,
        EnablepagoComponent,
        FormatMatriculaComponent,
        MenuformatComponent
      ],
})

export class SecretariaModule {}