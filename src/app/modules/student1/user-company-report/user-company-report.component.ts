import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { Student1Service } from '../student1.service';
import { User } from 'src/app/model/user.model';
import { Company } from 'src/app/model/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-company-report',
  templateUrl: './user-company-report.component.html',
  styleUrls: ['./user-company-report.component.css']
})
export class UserCompanyReportComponent implements OnInit {
  company: Company[] = [];

  constructor(
    private student1Service: Student1Service,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const user: User = this.authService.getUser()!;
    const userId = user.id;
    this.student1Service.getCompaniesByUserIdForRep(userId).subscribe({
      next: (data) => this.company = data,
      error: (err) => console.error('Error fetching companies', err)
    });
  }


  reportCompany(comp: Company): void {
    if (confirm('Are you sure you want to report this company?')) {
      this.router.navigate(['/report-reason'], { state: { company: comp } });
    }
  }


}
