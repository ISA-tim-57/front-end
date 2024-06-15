import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemAdminReportResponseComponent } from './sistem-admin-report-response.component';

describe('SistemAdminReportResponseComponent', () => {
  let component: SistemAdminReportResponseComponent;
  let fixture: ComponentFixture<SistemAdminReportResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemAdminReportResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SistemAdminReportResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
