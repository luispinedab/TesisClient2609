/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {AngularFireModule} from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbCardModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbIconModule,
} from '@nebular/theme';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import {UsersService}   from './services/users.service';
import { TestComponent } from './components/test/test.component';
import { environment } from 'environments/environment';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@NgModule({
  declarations: [AppComponent, NavigationComponent, UserFormComponent, UserListComponent, TestComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    Ng2SmartTableModule,
    NbCardModule,
    NbIconModule,
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
    providers: [
    UsersService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
