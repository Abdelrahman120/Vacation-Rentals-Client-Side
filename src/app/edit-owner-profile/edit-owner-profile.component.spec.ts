import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOwnerProfileComponent } from './edit-owner-profile.component';

describe('EditOwnerProfileComponent', () => {
  let component: EditOwnerProfileComponent;
  let fixture: ComponentFixture<EditOwnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOwnerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
