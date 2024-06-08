import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVComponent } from './user-v.component';

describe('UserVComponent', () => {
  let component: UserVComponent;
  let fixture: ComponentFixture<UserVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
