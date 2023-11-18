import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { CompanyProfileComponent } from './modules/student3/company-profile/company-profile.component';
import { UserProfileComponent } from './modules/student2/user-profile/user-profile/user-profile.component';
import { CompanySearchComponent } from './modules/student2/company-search/company-search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'companyprofile', component: CompanyProfileComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'companySearch', component: CompanySearchComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
