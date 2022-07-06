import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationContractsItemComponent } from './communication-contracts-item.component';

describe('CommunicationContractsItemComponent', () => {
  let component: CommunicationContractsItemComponent;
  let fixture: ComponentFixture<CommunicationContractsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationContractsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationContractsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
