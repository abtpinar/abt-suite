import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersPageComponent } from './farmers-page.component';

describe('FarmersPageComponent', () => {
  let component: FarmersPageComponent;
  let fixture: ComponentFixture<FarmersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
