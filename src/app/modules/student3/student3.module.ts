import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyAdministratorProfileComponent } from './company-administrator-profile/company-administrator-profile.component';
import { CompanyEquipmentsComponent } from './company-equipments/company-equipments.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { DeliveryPageComponent } from './delivery-page/delivery-page.component';
import { CustomersComponent } from './customers/customers.component';
import { LocationSimulatorComponent } from './location-simulator/location-simulator.component';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    CompanyProfileComponent,
    AppointmentsComponent,
    EquipmentsComponent,
    CompanyAdministratorProfileComponent,
    CreateAppointmentComponent,
    DeliveryPageComponent,
    CustomersComponent,
    LocationSimulatorComponent,
    MapComponent
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