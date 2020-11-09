import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFirstFeatureRoutingModule } from './my-first-feature-routing.module';
import { FirstListeComponent } from './pages/first-liste/first-liste.component';
import { FirstFormComponent } from './pages/first-form/first-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {HttpClientModule} from '@angular/common/http';
import {FirstFeatureService} from './services/first-feature.service';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [FirstListeComponent, FirstFormComponent],
  imports: [
    CommonModule,
    MyFirstFeatureRoutingModule,
    FormsModule,
    PanelModule,
    InputTextModule,
    DropdownModule,
    HttpClientModule,
    CalendarModule,
    RadioButtonModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule
  ],
  providers: [FirstFeatureService]
})
export class MyFirstFeatureModule { }
