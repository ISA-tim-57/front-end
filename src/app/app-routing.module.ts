import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { CompanyProfileComponent } from './modules/student3/company-profile/company-profile.component';

import { UserProfileComponent } from './modules/student2/user-profile/user-profile/user-profile.component';
import { CompanySearchComponent as cs2 } from './modules/student2/company-search2/company-search.component';

import {UserFormComponent}  from './modules/student1/user-form/user-form.component';
import { CompanySearchComponent as cs1} from './modules/student1/company-search/company-search.component';
import { EquipmentSearchComponent } from './modules/student1/equipment-search/equipment-search.component';
import { CompanyAdministratorProfileComponent } from './modules/student3/company-administrator-profile/company-administrator-profile.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'companyprofile', component: CompanyProfileComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'companySearch', component: cs2},
  {path: 'register',component: UserFormComponent },
  {path: 'companysearch',component: cs1 },
  {path: 'equipmentsearch',component: EquipmentSearchComponent },
  {path: 'administratorprofile', component: CompanyAdministratorProfileComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
