import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompanyReportReasonComponent } from './user-company-report-reason.component';

describe('UserCompanyReportReasonComponent', () => {
  let component: UserCompanyReportReasonComponent;
  let fixture: ComponentFixture<UserCompanyReportReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCompanyReportReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCompanyReportReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
