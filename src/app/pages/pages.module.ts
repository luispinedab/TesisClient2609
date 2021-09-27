import { NgModule } from '@angular/core';
import { NbMenuModule,NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';




@NgModule({
  imports: [
    
    Ng2SmartTableModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
