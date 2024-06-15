import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppoinmentsByCompanyViewComponent } from './user-appoinments-by-company-view.component';

describe('UserAppoinmentsByCompanyViewComponent', () => {
  let component: UserAppoinmentsByCompanyViewComponent;
  let fixture: ComponentFixture<UserAppoinmentsByCompanyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAppoinmentsByCompanyViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAppoinmentsByCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
