import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordUserComponent } from './reset-password-user.component';

describe('ResetPasswordUserComponent', () => {
  let component: ResetPasswordUserComponent;
  let fixture: ComponentFixture<ResetPasswordUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
