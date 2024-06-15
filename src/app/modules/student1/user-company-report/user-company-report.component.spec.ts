import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompanyReportComponent } from './user-company-report.component';

describe('UserCompanyReportComponent', () => {
  let component: UserCompanyReportComponent;
  let fixture: ComponentFixture<UserCompanyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCompanyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCompanyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
