import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { CLsSandbox } from 'src/app/cls/cls.sandbox';
import { CLModel } from 'src/app/cls/models/cl.model';
import { CLsConfigService } from 'src/app/cls/services/cls-config.service';
import { CLsService } from 'src/app/cls/services/cls.service';

// To use jquery function in component
declare var $: any;

@Component({
  selector: 'app-cls-payment-modal',
  templateUrl: './cls-payment-modal.component.html'
})
export class CLsPaymentModalComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  entities$: Observable<CLModel[]>;

  modalIsOpen$: Observable<boolean>;

  @Input()
  showUnits: boolean;

  constructor(
    private sandbox: CLsSandbox,
    private configService: CLsConfigService,
    private service: CLsService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.sandbox.clsLoading$;
    this.entities$ = this.sandbox.activeCls$;
    this.modalIsOpen$ = this.sandbox.uiModalOpen$;
  }

  ngOnDestroy(): void {
    this.sandbox.setActiveCls(null);
  }

  create(formset) {
    const sub$ = this.service.setPayment(formset).subscribe(() => {
      sub$.unsubscribe();
      this.close();
      this.sandbox.loadCLs();
    });
  }

  close() {
    this.sandbox.closeModal();
    this.configService.clearMarkedCls();    
  }

}
