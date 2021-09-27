import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbPopoverModule,NbSelectModule,NbDatepickerModule,NbButtonModule,NbActionsModule,NbUserModule,NbCheckboxModule,NbRadioModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ObservacionesRoutingModule, routedComponents } from './observaciones-routing.module';
import { AddobservacionesComponent } from './addobservaciones/addobservaciones.component';
import { EditobservacionesComponent } from './editobservaciones/editobservaciones.component';
import { VerobservacionesComponent } from './verobservaciones/verobservaciones.component';
import {ObservacionesComponent} from './observaciones.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { TablaverobservacionesComponent } from './tablaverobservaciones/tablaverobservaciones.component';
import { TablaeditarobservacionesComponent } from './tablaeditarobservaciones/tablaeditarobservaciones.component';
//import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    ObservacionesRoutingModule,
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
    FormsModule
  ],
  declarations: [
    ...routedComponents,
    ObservacionesComponent,
    AddobservacionesComponent,
    VerobservacionesComponent,
    EditobservacionesComponent,
    TablaverobservacionesComponent,
    TablaeditarobservacionesComponent,
  ],
})
export class ObservacionesModule { }
