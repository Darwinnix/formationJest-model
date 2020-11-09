import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FirstListeComponent} from './pages/first-liste/first-liste.component';
import {FirstFormComponent} from './pages/first-form/first-form.component';

const routes: Routes = [
  {
    path: 'liste',
    component: FirstListeComponent
  },
  {
    path: 'form',
    component: FirstFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFirstFeatureRoutingModule { }
