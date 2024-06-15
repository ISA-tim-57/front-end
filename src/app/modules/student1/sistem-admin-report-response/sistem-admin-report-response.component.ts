import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student1Service } from '../student1.service';
import { UserReport } from 'src/app/model/userReport.model';

@Component({
  selector: 'app-sistem-admin-report-response',
  templateUrl: './sistem-admin-report-response.component.html',
  styleUrls: ['./sistem-admin-report-response.component.css']
})
export class SistemAdminReportResponseComponent implements OnInit {
  reportForm: FormGroup;
  reportId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private student1Service: Student1Service,
    private router: Router
  ) {
    this.reportForm = this.fb.group({
      response: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.reportId = +this.route.snapshot.paramMap.get('id')!;
  }

  submitResponse(): void {
    if (this.reportForm.valid) {
      const updatedReport: Partial<UserReport> = {
        response: this.reportForm.value.response,
        status: this.reportForm.value.status
      };

      this.student1Service.addReviewToReport(this.reportId, updatedReport as UserReport).subscribe(
        () => {
          alert('Response submitted successfully');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error submitting response:', error);
        }
      );
    }
  }
}
