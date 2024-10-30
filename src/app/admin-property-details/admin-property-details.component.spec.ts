import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropertyDetailsComponent } from './admin-property-details.component';

describe('AdminPropertyDetailsComponent', () => {
  let component: AdminPropertyDetailsComponent;
  let fixture: ComponentFixture<AdminPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPropertyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
