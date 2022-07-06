import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { CLsSandbox } from 'src/app/cls/cls.sandbox';
import { CLModel } from 'src/app/cls/models/cl.model';
import { CLsConfigService } from 'src/app/cls/services/cls-config.service';
import { CLsService } from 'src/app/cls/services/cls.service';
import { TableCode } from 'src/app/common/models/table-code.model';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';

// To use jquery function in component
declare var $: any;

@Component({
  selector: 'app-cls-refund-modal',
  templateUrl: './cls-refund-modal.component.html'
})
export class CLsRefundModalComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  entities$: Observable<CLModel[]>;

  availableRefundMotives$: Observable<TableCode[]>;

  modalIsOpen$: Observable<boolean>;

  constructor(
    private sandbox: CLsSandbox,
    private configService: CLsConfigService,
    private service: CLsService,
    private codeTablesService: CodeTablesService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.sandbox.clsLoading$;
    this.entities$ = this.sandbox.activeCls$;
    this.modalIsOpen$ = this.sandbox.uiModalOpen$;

    this.availableRefundMotives$ = this.codeTablesService.getCodeTableByKey(this.codeTablesService.availableTableKeys.RefundMotives);
  }

  ngOnDestroy(): void {
    this.sandbox.setActiveCls(null);
  }

  create(formset) {
    const sub$ = this.service.updateItem(formset).subscribe(() => {
      sub$.unsubscribe();
      this.close();
      this.sandbox.loadCLs();
    });
  }

  close() {
    this.sandbox.closeModal();    
  }

}
