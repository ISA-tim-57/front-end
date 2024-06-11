import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCanceOrderEquipmentComponent } from './user-cance-order-equipment.component';

describe('UserCanceOrderEquipmentComponent', () => {
  let component: UserCanceOrderEquipmentComponent;
  let fixture: ComponentFixture<UserCanceOrderEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCanceOrderEquipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCanceOrderEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
