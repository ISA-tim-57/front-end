import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminReportReasonComponent } from './user-admin-report-reason.component';

describe('UserAdminReportReasonComponent', () => {
  let component: UserAdminReportReasonComponent;
  let fixture: ComponentFixture<UserAdminReportReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdminReportReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAdminReportReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
