import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAdmin } from 'src/app/model/company-admin.model';
import { Student1Service } from '../student1.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-admins-report',
  templateUrl: './user-admins-report.component.html',
  styleUrls: ['./user-admins-report.component.css']
})
export class UserAdminsReportComponent implements OnInit {
  companyAdmin: CompanyAdmin[] = [];

 
  constructor(
    private student1Service: Student1Service,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user: User = this.authService.getUser()!;
    const userId = user.id;
    this.student1Service.getCompanyAdminsByUserIdForRep(userId).subscribe({
      next: (data) => this.companyAdmin = data,
      error: (err) => console.error('Error fetching company admins', err)
    });
  }

  reportAdmin(admin: CompanyAdmin): void {
    if (confirm('Are you sure you want to report this company?')) {
      this.router.navigate(['/reportAdmin-reason'], { state: { companyAdmin: admin } });
    }
  }


}
