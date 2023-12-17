import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyAdministratorProfileComponent } from './company-administrator-profile/company-administrator-profile.component';
import { CompanyEquipmentsComponent } from './company-equipments/company-equipments.component';



@NgModule({
  declarations: [
    CompanyProfileComponent,
    AppointmentsComponent,
    EquipmentsComponent,
    CompanyAdministratorProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompanyEquipmentsComponent
  ],
  exports : [
  ]
})
export class Student3Module { }