import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {NbPopoverModule,NbCardModule, NbIconModule, NbInputModule, NbStepperModule,NbSelectModule,NbDatepickerModule,NbButtonModule,NbActionsModule,NbUserModule,NbCheckboxModule,NbRadioModule, NbListModule, NbSpinnerModule, NbToastrModule,} from '@nebular/theme';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NbDateFnsDateModule} from '@nebular/date-fns';
import { ThemeModule } from '../../@theme/theme.module';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { AdmisionRoutingModule, routedComponents } from './admision-routing.module';
import { FormularioComponent } from './formulario/formulario.component';
import {DialogNamePromptComponent} from './formulario/dialog-name-prompt/dialog-name-prompt.component';
import {FormExperienciasComponent} from './formulario/FormExperiencias/dialog-name-prompt.component';
import { CitasComponent } from './citas/citas.component';
import {NbAlertModule} from '@nebular/theme';
import { SuccescitaComponent } from './succescita/succescita.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';


FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin
])
@NgModule({
    imports: [
        NbToastrModule.forRoot(),
        NbSpinnerModule,
        CommonModule,
        NbCardModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        AdmisionRoutingModule,
        NbListModule,
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
        FormularioComponent,
        DialogNamePromptComponent,
        FormExperienciasComponent,
        CitasComponent,
        SuccescitaComponent,
        EvaluacionComponent
      ],
})

export class AdmisionModule {}