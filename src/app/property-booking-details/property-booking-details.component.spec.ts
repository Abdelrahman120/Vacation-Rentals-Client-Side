import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBookingDetailsComponent } from './property-booking-details.component';

describe('PropertyBookingDetailsComponent', () => {
  let component: PropertyBookingDetailsComponent;
  let fixture: ComponentFixture<PropertyBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyBookingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
