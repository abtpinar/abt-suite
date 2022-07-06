import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSelectorFormControlComponent } from './farmer-selector-form-control.component';

describe('FarmerSelectorFormControlComponent', () => {
  let component: FarmerSelectorFormControlComponent;
  let fixture: ComponentFixture<FarmerSelectorFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerSelectorFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerSelectorFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
