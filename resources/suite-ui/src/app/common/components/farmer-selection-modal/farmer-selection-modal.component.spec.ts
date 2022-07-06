import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSelectionModalComponent } from './client-selection-modal.component';

describe('ClientSelectionModalComponent', () => {
  let component: ClientSelectionModalComponent;
  let fixture: ComponentFixture<ClientSelectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSelectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
