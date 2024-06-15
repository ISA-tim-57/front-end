import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Student1Service } from '../student1.service';
import { User } from 'src/app/model/user.model';
import { Company } from 'src/app/model/company.model';
import { UserReport, createEmptyReport } from 'src/app/model/userReport.model';

@Component({
  selector: 'app-user-company-report-reason',
  templateUrl: './user-company-report-reason.component.html',
  styleUrls: ['./user-company-report-reason.component.css']
})
export class UserCompanyReportReasonComponent {
  report: UserReport = createEmptyReport();
  company: Company | null = null;

  constructor(
    private authService: AuthService,
    private student1Service: Student1Service,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { company: Company };
    this.company = state?.company || null;

    if (this.company) {
      const user: User = this.authService.getUser()!;
      this.report.sender.user = user;
      this.report.reportedCompany = this.company;
      this.report.response="";
      this.report.status="ON_HOLD";
    }
  }

  submitReport(): void {
    this.student1Service.addReport(this.report).subscribe({
      next: () => {
        alert('Report submitted successfully');
        this.router.navigate(['/report']);
      },
      error: (err) => console.error('Error submitting report', err)
    });
  }
}
