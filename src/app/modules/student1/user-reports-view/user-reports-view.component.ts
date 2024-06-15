import { Component, OnInit } from '@angular/core';
import { UserReport } from 'src/app/model/userReport.model';
import { Student1Service } from '../student1.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-reports-view',
  templateUrl: './user-reports-view.component.html',
  styleUrls: ['./user-reports-view.component.css']
})
export class UserReportsViewComponent implements OnInit {
  userReports: UserReport[] = [];

  constructor(private student1Service: Student1Service, private authService: AuthService) {}

  ngOnInit(): void {
    const user: User = this.authService.getUser()!;
    const userId = user.id; // Replace with dynamic user ID as needed
    this.fetchUserReports(userId);
  }

  fetchUserReports(userId: number): void {
    this.student1Service.getReportByUserId(userId).subscribe(
      (reports) => {
        this.userReports = reports;
      },
      (error) => {
        console.error('Error fetching user reports', error);
      }
    );
  }
}
