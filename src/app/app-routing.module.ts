import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { CompanyProfileComponent } from './modules/student3/company-profile/company-profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'companyprofile', component: CompanyProfileComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
