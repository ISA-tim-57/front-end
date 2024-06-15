import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemAdminReportViewComponent } from './sistem-admin-report-view.component';

describe('SistemAdminReportViewComponent', () => {
  let component: SistemAdminReportViewComponent;
  let fixture: ComponentFixture<SistemAdminReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemAdminReportViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SistemAdminReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
