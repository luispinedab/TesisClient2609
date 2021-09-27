import { NgModule } from '@angular/core';
import { NbMenuModule,NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbAlertModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { LoginComponent } from '../acceso/login/login.component';
import { AccesoRoutingModule, routedComponents } from './acceso-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RespasswordComponent } from './respassword/respassword.component';
import { HomeComponent } from './home/home.component';






@NgModule({
  imports: [
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    AccesoRoutingModule,
    NbAuthModule,
    FormsModule,
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    CommonModule
  ],
  declarations: [
    ...routedComponents,
    LoginComponent,
    RespasswordComponent,
    HomeComponent
  ],
})
export class AccesoModule { }