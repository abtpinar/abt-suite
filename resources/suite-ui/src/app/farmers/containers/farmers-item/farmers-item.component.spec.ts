import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersItemComponent } from './farmers-item.component';

describe('FarmersItemComponent', () => {
  let component: FarmersItemComponent;
  let fixture: ComponentFixture<FarmersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmersItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
