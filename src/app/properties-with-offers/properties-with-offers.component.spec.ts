import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesWithOffersComponent } from './properties-with-offers.component';

describe('PropertiesWithOffersComponent', () => {
  let component: PropertiesWithOffersComponent;
  let fixture: ComponentFixture<PropertiesWithOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesWithOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesWithOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
