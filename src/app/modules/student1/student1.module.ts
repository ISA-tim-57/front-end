import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CompanySearchComponent } from './company-search/company-search.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { UserVComponent } from './user-v/user-v.component'; // Import your component here
import { UserFormComponent } from './user-form/user-form.component';
import { UserEquipmentsByCompanyViewComponent } from './user-equipments-by-company-view/user-equipments-by-company-view.component';
import { UserAppoinmentsByCompanyViewComponent } from './user-appoinments-by-company-view/user-appoinments-by-company-view.component';
import { UserCanceOrderEquipmentComponent } from './user-cance-order-equipment/user-cance-order-equipment.component';

@NgModule({
  declarations: [

    CompanySearchComponent,
    EquipmentSearchComponent,
    UserVComponent,
    UserFormComponent,
    UserEquipmentsByCompanyViewComponent,
    UserAppoinmentsByCompanyViewComponent,
    UserCanceOrderEquipmentComponent // Ensure your component is declared in the module
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class Student1Module { }
