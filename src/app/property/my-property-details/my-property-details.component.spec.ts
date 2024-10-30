import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPropertyDetailsComponent } from './my-property-details.component';

describe('MyPropertyDetailsComponent', () => {
  let component: MyPropertyDetailsComponent;
  let fixture: ComponentFixture<MyPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPropertyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
