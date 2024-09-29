import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyComponent } from './add-property.component';

describe('AddPropertyComponent', () => {
  let component: AddPropertyComponent;
  let fixture: ComponentFixture<AddPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
