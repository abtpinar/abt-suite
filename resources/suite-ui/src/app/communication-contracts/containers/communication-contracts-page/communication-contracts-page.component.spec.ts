import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationContractsPageComponent } from './communication-contracts-page.component';

describe('CommunicationContractsPageComponent', () => {
  let component: CommunicationContractsPageComponent;
  let fixture: ComponentFixture<CommunicationContractsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationContractsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationContractsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
