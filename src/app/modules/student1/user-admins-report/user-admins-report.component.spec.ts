import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminsReportComponent } from './user-admins-report.component';

describe('UserAdminsReportComponent', () => {
  let component: UserAdminsReportComponent;
  let fixture: ComponentFixture<UserAdminsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdminsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAdminsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
