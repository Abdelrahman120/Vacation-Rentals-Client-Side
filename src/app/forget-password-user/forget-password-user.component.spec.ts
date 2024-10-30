import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordUserComponent } from './forget-password-user.component';

describe('ForgetPasswordUserComponent', () => {
  let component: ForgetPasswordUserComponent;
  let fixture: ComponentFixture<ForgetPasswordUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetPasswordUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPasswordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
