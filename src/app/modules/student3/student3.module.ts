import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    CompanyProfileComponent,
    AppointmentsComponent,
    EquipmentsComponent
  ],
  imports: [
    CommonModule,
  ],
  exports : [
  ]
})
export class Student3Module { }
