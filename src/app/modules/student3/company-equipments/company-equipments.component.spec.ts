import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEquipmentsComponent } from './company-equipments.component';

describe('CompanyEquipmentsComponent', () => {
  let component: CompanyEquipmentsComponent;
  let fixture: ComponentFixture<CompanyEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyEquipmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
