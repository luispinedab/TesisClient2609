import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbPopoverModule,NbSelectModule,NbDatepickerModule,NbButtonModule,NbActionsModule,NbUserModule,NbCheckboxModule,NbRadioModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { EstudianteRoutingModule, routedComponents } from './estudiante-routing.module';
import {EstudianteComponent} from './estudiante.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { ConsultarfallasComponent } from './consultarfallas/consultarfallas.component';
import { ConsultarobservacionComponent } from './consultarobservacion/consultarobservacion.component';
import { ConsultarnotasComponent } from './consultarnotas/consultarnotas.component';
import { TablaconsultarnotasComponent } from './tablaconsultarnotas/tablaconsultarnotas.component';




@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    EstudianteRoutingModule,
    Ng2SmartTableModule,
    NbPopoverModule,
    NbSelectModule,
    NbDatepickerModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    ReactiveFormsModule,
    FormsModule,
    NbDatepickerModule
  ],
  declarations: [
    ...routedComponents,
    EstudianteComponent,
    ConsultarfallasComponent,
    ConsultarobservacionComponent,
    ConsultarnotasComponent,
    TablaconsultarnotasComponent,
  ],
})
export class EstudianteModule { }
