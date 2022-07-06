import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsItemComponent } from './contracts-item.component';

describe('ContractsItemComponent', () => {
  let component: ContractsItemComponent;
  let fixture: ComponentFixture<ContractsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
