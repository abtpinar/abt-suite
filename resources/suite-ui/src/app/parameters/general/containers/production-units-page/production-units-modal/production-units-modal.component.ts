import { NgxPermissionsService } from 'ngx-permissions';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { ProductionUnitsSandbox } from '../../../production-units.sandbox';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TableCode } from 'src/app/common/models/table-code.model';
import { ProductionUnitsService } from '../../../services/production-units.service';
import { ProductionUnitModel } from '../../../models/production-unit.model';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';

// To use jquery function in component
declare var $: any;

@Component({
  selector: 'app-production-units-modal',
  templateUrl: './production-units-modal.component.html'
})
export class ProductionUnitsModalComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  entity$: Observable<ProductionUnitModel>;

  modalIsOpen$: Observable<boolean>;

  constructor(
    private sandbox: ProductionUnitsSandbox,
    private codeTablesService: CodeTablesService) { }

  ngOnInit() {
    this.isLoading$ = this.sandbox.classesLoading$;
    this.entity$ = this.sandbox.activeProductionUnit$;
    this.modalIsOpen$ = this.sandbox.uiModalOpen$;
  }

  ngOnDestroy(): void {
    this.sandbox.setActiveProductionUnit(null);
  }

  create(tProductionUnit: ProductionUnitModel) {
    this.sandbox.addProductionUnit(tProductionUnit);
  }

  update(tProductionUnit: ProductionUnitModel) {
    this.sandbox.updateProductionUnit(tProductionUnit);
  }

  close() {
    this.sandbox.closeModal();
  }

}
