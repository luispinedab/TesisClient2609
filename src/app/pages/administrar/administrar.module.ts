import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbPopoverModule,NbCardModule, NbIconModule, NbInputModule, NbStepperModule,NbSelectModule,NbDatepickerModule,NbButtonModule,NbActionsModule,NbUserModule,NbCheckboxModule,NbRadioModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AdministrarRoutingModule, routedComponents } from './administrar-routing.module';
import { GradesComponent } from './grades/grades.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { AgregarComponent } from './achievements/agregar/agregar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AgregarComponent1} from './subjects/agregar/agregar.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbSelectModule,
    NbDatepickerModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbPopoverModule,
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    AdministrarRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    GradesComponent,
    SubjectsComponent,
    AchievementsComponent,
    AgregarComponent,
    AgregarComponent1
  ],
})
export class AdministrarModule { }
