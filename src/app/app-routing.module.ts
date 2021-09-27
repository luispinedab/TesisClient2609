import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {UserListComponent} from '../app/components/user-list/user-list.component';
import {NavigationComponent} from '../app/components/navigation/navigation.component';

import {
  NbAuthComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {RespasswordComponent} from './pages/acceso/respassword/respassword.component';
import {LoginComponent} from './pages/acceso/login/login.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
      
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'administrar',
    component:NavigationComponent,
  },
  {
    path: 'administrar/usuarios',
    component:UserListComponent,
  },
  {
    path: 'administrar/usuarios/crud/:id',
    component:UserListComponent, 
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: RespasswordComponent,
      }
    ],
  }
];
const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
