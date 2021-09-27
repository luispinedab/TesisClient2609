import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrarComponent  } from './administrar.component';
import { TestComponent } from './test/test.component';
import {GradesComponent } from './grades/grades.component';
import {SubjectsComponent} from './subjects/subjects.component';
import {AchievementsComponent} from './achievements/achievements.component';


const routes: Routes = [{
  path: '',
  component: AdministrarComponent,
  children: [
    {
      path: 'administrar-usuarios',
      component: TestComponent
    },
    {
      path: 'administrar-cursos',
      component: GradesComponent,
    },
    {
      path: 'administrar-asignaturas',
      component: SubjectsComponent,
      
    },
    {
      path: 'administrar-logros',
      component: AchievementsComponent,
      
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarRoutingModule { }

export const routedComponents = [
  AdministrarComponent,
  TestComponent,
  GradesComponent,
  SubjectsComponent,
  AchievementsComponent
];