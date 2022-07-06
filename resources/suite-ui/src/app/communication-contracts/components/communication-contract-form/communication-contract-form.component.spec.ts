import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationContractFormComponent } from './communication-contract-form.component';

describe('CommunicationContractFormComponent', () => {
  let component: CommunicationContractFormComponent;
  let fixture: ComponentFixture<CommunicationContractFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationContractFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
