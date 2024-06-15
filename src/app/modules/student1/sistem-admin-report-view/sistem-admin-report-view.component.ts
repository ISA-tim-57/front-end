import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReport } from 'src/app/model/userReport.model';
import { Student1Service } from '../student1.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sistem-admin-report-view',
  templateUrl: './sistem-admin-report-view.component.html',
  styleUrls: ['./sistem-admin-report-view.component.css']
})
export class SistemAdminReportViewComponent {
  reports: UserReport[] = [];

  constructor(private student1Service: Student1Service, private router: Router) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    this.student1Service.getReportForReview().subscribe(
      (data: UserReport[]) => {
        this.reports = data;
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  confirmAndNavigate(report: UserReport): void {
    if (confirm('Are you sure you want to answer this report?')) {
      this.router.navigate(['/report-response', report.id]);
    }
  }
}
