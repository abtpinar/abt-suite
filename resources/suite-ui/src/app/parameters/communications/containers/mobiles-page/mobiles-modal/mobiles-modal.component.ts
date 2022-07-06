import { NgxPermissionsService } from 'ngx-permissions';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MobilesSandbox } from '../../../mobiles.sandbox';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TableCode } from 'src/app/common/models/table-code.model';
import { MobilesService } from '../../../services/mobiles.service';
import { MobileModel } from '../../../models/mobile.model';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { MobileBrandModel } from '../../../models/mobile-brand.model';
import { MobileModelModel } from '../../../models/mobile-model.model';

@Component({
  selector: 'app-mobiles-modal',
  templateUrl: './mobiles-modal.component.html'
})
export class MobilesModalComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  entity$: Observable<MobileModel>;

  availableBrands$: Observable<MobileBrandModel[]>;
  availableModels$: Observable<MobileModelModel[]>;

  modalIsOpen$: Observable<boolean>;

  constructor(
    private sandbox: MobilesSandbox
  ) { }

  ngOnInit() {
    this.isLoading$ = this.sandbox.mobilesLoading$;
    this.entity$ = this.sandbox.activeMobile$;
    this.modalIsOpen$ = this.sandbox.uiModalOpen$;

    this.availableBrands$ = this.sandbox.availableBrands$;
    this.availableModels$ = this.sandbox.availableModels$;
  }

  ngOnDestroy(): void {
    this.sandbox.setActiveMobile(null);
  }

  create(entity: MobileModel) {
    this.sandbox.addMobile(entity);
  }

  update(entity: MobileModel) {
    this.sandbox.updateMobile(entity);
  }

  close() {
    this.sandbox.closeModal();
  }

}
