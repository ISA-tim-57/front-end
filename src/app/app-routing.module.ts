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
import { ErrorComponent } from './auth/error/error.component';
import { UserGuard } from './auth/user.guard';
import { CompanyAdminGuard } from './auth/companyadmin.guard';
import { CompanyEquipmentsComponent } from './modules/student3/company-equipments/company-equipments.component';
import { CreateAppointmentComponent } from './modules/student3/create-appointment/create-appointment.component';
import { DeliveryPageComponent } from './modules/student3/delivery-page/delivery-page.component';
import { CustomersComponent } from './modules/student3/customers/customers.component';
import { LocationSimulatorComponent } from './modules/student3/location-simulator/location-simulator.component';
import { MapComponent } from './modules/student3/map/map.component';
import { UserVComponent } from './modules/student1/user-v/user-v.component';
import { UserEquipmentsByCompanyViewComponent } from './modules/student1/user-equipments-by-company-view/user-equipments-by-company-view.component';
import { UserAppoinmentsByCompanyViewComponent } from './modules/student1/user-appoinments-by-company-view/user-appoinments-by-company-view.component';
import { UserCanceOrderEquipmentComponent } from './modules/student1/user-cance-order-equipment/user-cance-order-equipment.component';
import { UserAdminsReportComponent } from './modules/student1/user-admins-report/user-admins-report.component';
import { UserCompanyReportComponent } from './modules/student1/user-company-report/user-company-report.component';
import { UserCompanyReportReasonComponent } from './modules/student1/user-company-report-reason/user-company-report-reason.component';
import { UserAdminReportReasonComponent } from './modules/student1/user-admin-report-reason/user-admin-report-reason.component';
import { UserReportsViewComponent } from './modules/student1/user-reports-view/user-reports-view.component';
import { SystemAdminGuard } from './auth/systemadmin.guard';
import { SistemAdminReportViewComponent } from './modules/student1/sistem-admin-report-view/sistem-admin-report-view.component';
import { SistemAdminReportResponseComponent } from './modules/student1/sistem-admin-report-response/sistem-admin-report-response.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'companyprofile', component: CompanyProfileComponent, canActivate: [UserGuard]},
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'companySearch', component: cs2},
  {path: 'register',component: UserFormComponent },
  {path: 'companysearch',component: cs1 },
  {path: 'equipmentsearch',component: EquipmentSearchComponent },
  {path: 'administratorprofile', component: CompanyAdministratorProfileComponent, canActivate: [CompanyAdminGuard]},
  {path: 'company-equipments', component: CompanyEquipmentsComponent, canActivate: [CompanyAdminGuard]},
  {path: 'create-appointment', component: CreateAppointmentComponent, canActivate: [CompanyAdminGuard]},
  {path: 'delivery', component: DeliveryPageComponent, canActivate: [CompanyAdminGuard]},
  {path: 'customers', component: CustomersComponent, canActivate: [CompanyAdminGuard]},
  {path: 'location-simulator', component: LocationSimulatorComponent},
  {path: 'verify/:id', component: UserVComponent},
  { path: 'equipments/:companyId', component: UserEquipmentsByCompanyViewComponent, canActivate: [UserGuard]}, // Add this line for equipments
  { path: 'appointments/:companyId', component: UserAppoinmentsByCompanyViewComponent,canActivate: [UserGuard]},
  { path: 'ordersCancle', component: UserCanceOrderEquipmentComponent,canActivate: [UserGuard]}, // Add this line for appointments
  { path: 'reportAdmin', component: UserAdminsReportComponent,canActivate: [UserGuard]},
  { path: 'reportCompany', component: UserCompanyReportComponent,canActivate: [UserGuard]},
  { path: 'report-reason', component: UserCompanyReportReasonComponent,canActivate: [UserGuard] },
  { path: 'reportAdmin-reason', component:UserAdminReportReasonComponent,canActivate: [UserGuard] },
  { path: 'reports', component: UserReportsViewComponent,canActivate: [UserGuard]},
  { path: 'reportsAdmin', component: SistemAdminReportViewComponent,canActivate: [SystemAdminGuard]},
  { path: 'report-response/:id', component: SistemAdminReportResponseComponent, canActivate: [SystemAdminGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
