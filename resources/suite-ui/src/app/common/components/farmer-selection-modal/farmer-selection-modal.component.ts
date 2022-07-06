import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { BaseTableConfiguration } from '../../../common/components/base-table/base-table-config';
import { FarmersSandbox } from '../../../farmers/farmers.sandbox';
import { Observable, Subscription } from 'rxjs';
import { ServerPaginationInfo } from '../../../common/models/ServerPaginationInfo';
import { FarmerModel } from '../../../farmers/models/farmer.model';
import { FarmersConfigService } from 'src/app/farmers/services/farmers-config.service';
import {DEFAULT_PAGE_SIZE, PaginationInfo} from '../../pagination';

// To use jquery function in component
declare var $: any;

@Component({
  selector: 'app-farmer-selection-modal',
  templateUrl: './farmer-selection-modal.component.html',
  styleUrls: ['./farmer-selection-modal.component.sass']
})
export class FarmerSelectionModalComponent implements OnInit, OnDestroy {
  tableConfig: BaseTableConfiguration = {
    containerClasses: 'p-0',
    autoLayout: true,
    noDataMessage: 'table-empty-data',
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters()
  };

  isLoading$: Observable<boolean>;

  farmers$: Observable<FarmerModel[]>;

  includes = 'shipments,contacts,retrieves';
  paginationInfo: PaginationInfo = {
    page: 1,
    itemsPerPage: DEFAULT_PAGE_SIZE
  };

  paginationInfo$: Observable<ServerPaginationInfo>;

  autocloseModalSubs$: Subscription;

  @Output() selectFarmer = new EventEmitter<FarmerModel>();
  @Output() closeEvent = new EventEmitter();

  sector: string;

  constructor(
    private farmerSandbox: FarmersSandbox,
    private configService: FarmersConfigService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.farmerSandbox.farmersLoading$;
    this.farmers$ = this.farmerSandbox.farmers$;
    this.paginationInfo$ = this.farmerSandbox.farmersPaginationInfo$;
    // this.onSearch({});
    this.farmerSandbox.loadFarmers(this.paginationInfo);

    // this.autocloseModalSubs$ = this.farmerSandbox.uiModalOpen$.subscribe(
    //   isOpen => !isOpen && this.modalRef.hide()
    // );

    this.tableConfig.searchConfig = this.configService.getListFilters();
  }

  ngOnDestroy(): void {
    // this.autocloseModalSubs$.unsubscribe();
  }

  setSelectedFarmer(farmer: FarmerModel) {
    this.selectFarmer.emit(farmer);
    // this.modalRef.hide();
    // this.farmerSandbox.closeModal();
    $('#farmer-selection-modal').modal('hide');
  }

  close() {
    // this.modalRef.hide();
    // this.farmerSandbox.closeModal();
  }

  onSearch(terms: any) {
    console.log('sector::.', this.sector);
    if (this.sector) {
      if (terms.hasOwnProperty('sector')) {
        terms['sector'] = this.sector;
      } else {
        terms = { ...terms, sector:this.sector };
      }
    }

    if (!terms['province']) terms['locality'] = '';
    this.farmerSandbox.search(terms, {...this.paginationInfo, page: 1});
  }

  loadPage(pageEvent: PaginationInfo) {
    this.paginationInfo = {...pageEvent};
    this.farmerSandbox.loadFarmers(this.paginationInfo);
  }
}
