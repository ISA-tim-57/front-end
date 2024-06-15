import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEquipmentsByCompanyViewComponent } from './user-equipments-by-company-view.component';

describe('UserEquipmentsByCompanyViewComponent', () => {
  let component: UserEquipmentsByCompanyViewComponent;
  let fixture: ComponentFixture<UserEquipmentsByCompanyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEquipmentsByCompanyViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEquipmentsByCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
