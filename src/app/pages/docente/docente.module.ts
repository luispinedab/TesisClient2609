import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbPopoverModule,NbSelectModule,NbDatepickerModule,NbButtonModule,NbActionsModule,NbUserModule,NbCheckboxModule,NbRadioModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { DocenteRoutingModule, routedComponents } from './docente-routing.module';
import { AsignarlogrosComponent } from './asignarlogros/asignarlogros.component';
import {DocenteComponent} from './docente.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { TablalogrosComponent } from './tablalogros/tablalogros.component';
import { NotasComponent } from './notas/notas.component';
import { TablanotasComponent } from './tablanotas/tablanotas.component';
import { FallasComponent } from './fallas/fallas.component';
import { TablafallasComponent } from './tablafallas/tablafallas.component';
import { ReportarComponent } from './tablafallas/reportar/reportar.component';
import { VerComponent } from './tablafallas/ver/ver.component';
import { MenureportesComponent } from './menureportes/menureportes.component';
import { ReportesComponent1 } from './menureportes/reportes/reportes.component';
import { PromocionComponent } from './promocion/promocion.component';
import { MenupromocionComponent } from './menupromocion/menupromocion.component';
//import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    DocenteRoutingModule,
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
    DocenteComponent,
    AsignarlogrosComponent,
    TablalogrosComponent,
    NotasComponent,
    TablanotasComponent,
    FallasComponent,
    TablafallasComponent,
    ReportarComponent,
    VerComponent,
    MenureportesComponent,
    ReportesComponent1,
    PromocionComponent,
    MenupromocionComponent,
  ],
})
export class DocenteModule { }
