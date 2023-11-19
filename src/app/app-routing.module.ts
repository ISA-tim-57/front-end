import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { CompanyProfileComponent } from './modules/student3/company-profile/company-profile.component';
import {UserFormComponent}  from './modules/student1/user-form/user-form.component';
import { CompanySearchComponent } from './modules/student1/company-search/company-search.component';
import { EquipmentSearchComponent } from './modules/student1/equipment-search/equipment-search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'companyprofile', component: CompanyProfileComponent},
  {path: 'register',component: UserFormComponent },
  {path: 'companysearch',component: CompanySearchComponent },
  {path: 'equipmentsearch',component: EquipmentSearchComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
