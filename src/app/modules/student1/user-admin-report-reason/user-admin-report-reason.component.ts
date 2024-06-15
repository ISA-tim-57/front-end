import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { UserReport, createEmptyReport } from 'src/app/model/userReport.model';
import { CompanyAdmin } from 'src/app/model/company-admin.model';
import { Student1Service } from '../student1.service';
import { Router } from '@angular/router';
import { createEmptyCompany } from 'src/app/model/company.model';

@Component({
  selector: 'app-user-admin-report-reason',
  templateUrl: './user-admin-report-reason.component.html',
  styleUrls: ['./user-admin-report-reason.component.css']
})
export class UserAdminReportReasonComponent {
  report: UserReport = createEmptyReport();
  companyAdmin: CompanyAdmin | null = null;

  constructor(
    private authService: AuthService,
    private student1Service: Student1Service,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { companyAdmin: CompanyAdmin };
    this.companyAdmin = state?.companyAdmin || null;

    if (this.companyAdmin) {
      const user: User | null = this.authService.getUser();
      if (user) {
        this.report.sender.user = user;
        this.report.reportedCompanyAdmin = this.companyAdmin;
        this.report.response = "";
        this.report.status = "ON_HOLD";
      } else {
        console.error('User not found');
      }
    } else {
      console.error('CompanyAdmin not found');
    }
  }

  submitReport(): void {
    
    
    
    if (this.companyAdmin) {
      console.log(this.report.description);
      console.log(this.report.status);
      console.log(this.report.sender);
      console.log(this.report.reportedCompanyAdmin);
      this.student1Service.addReport(this.report).subscribe({
        next: () => {
          alert('Report submitted successfully');
          this.router.navigate(['/report']);
        },
        error: (err) => console.error('Error submitting report', err)
      });
    } else {
      console.error('Cannot submit report, companyAdmin is null');
    }
  }
}
