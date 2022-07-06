import { Component, OnDestroy, OnInit } from '@angular/core';
import { SimsSandbox } from '../../../sims.sandbox';
import { Observable } from 'rxjs';
import { SimModel } from '../../../models/sim.model';

@Component({
  selector: 'app-sims-modal',
  templateUrl: './sims-modal.component.html'
})
export class SimsModalComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  entity$: Observable<SimModel>;

  modalIsOpen$: Observable<boolean>;

  constructor(
    private sandbox: SimsSandbox
  ) { }

  ngOnInit() {
    this.isLoading$ = this.sandbox.simsLoading$;
    this.entity$ = this.sandbox.activeSim$;
    this.modalIsOpen$ = this.sandbox.uiModalOpen$;
  }

  ngOnDestroy(): void {
    this.sandbox.setActiveSim(null);
  }

  create(entity: SimModel) {
    this.sandbox.addSim(entity);
  }

  update(entity: SimModel) {
    this.sandbox.updateSim(entity);
  }

  close() {
    this.sandbox.closeModal();
  }

}
