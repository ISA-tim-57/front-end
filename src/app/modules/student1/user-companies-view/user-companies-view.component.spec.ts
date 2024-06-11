import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompaniesViewComponent } from './user-companies-view.component';

describe('UserCompaniesViewComponent', () => {
  let component: UserCompaniesViewComponent;
  let fixture: ComponentFixture<UserCompaniesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCompaniesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCompaniesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
