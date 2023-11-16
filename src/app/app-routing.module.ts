import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { CompanyProfileComponent } from './modules/student3/company-profile/company-profile.component';
import { CompanyAdministratorProfileComponent } from './modules/student3/company-administrator-profile/company-administrator-profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'companyprofile', component: CompanyProfileComponent},
  {path: 'administratorprofile', component: CompanyAdministratorProfileComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
