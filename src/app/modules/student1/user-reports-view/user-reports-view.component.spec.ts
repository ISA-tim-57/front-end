import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportsViewComponent } from './user-reports-view.component';

describe('UserReportsViewComponent', () => {
  let component: UserReportsViewComponent;
  let fixture: ComponentFixture<UserReportsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReportsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReportsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
