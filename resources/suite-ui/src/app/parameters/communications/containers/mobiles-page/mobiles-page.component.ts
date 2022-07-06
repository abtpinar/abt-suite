import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';
import {
  BaseTableConfiguration
} from 'src/app/common/components/base-table/base-table-config';
import { MobileModel } from '../../models/mobile.model';
import { MobilesSandbox } from '../../mobiles.sandbox';
import { MobilesConfigService } from '../../services/mobiles-config.service';
import { BaseTableFilterFactoryService } from 'src/app/common/services/base-table-filter-factory.service';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { MobilesService } from '../../services/mobiles.service';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
  selector: 'app-mobiles-page',
  templateUrl: './mobiles-page.component.html'
})
export class MobilesPageComponent implements OnInit, OnDestroy {

  entities$: Observable<MobileModel[]>;
  isLoading$: Observable<boolean>;
  paginationInfo$: Observable<ServerPaginationInfo>;

  tableConfig: BaseTableConfiguration = {
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters(),
    useHeaderTemplate: true,
    rowActionButtons: [
      {
        tooltipI18nKey: 'mobiles-page.list-btn.delete',
        icon: 'fe-trash',
        class: 'text-primary',
        callback: (mobile: MobileModel) => this.sandbox.deleteMobile(mobile),
        // visibleFn: (mobile: MobileModel) => mobile.contracts.data.length == 0
      },
      {
        tooltipI18nKey: 'btn-edit',
        icon: 'fe-edit-2',
        class: 'text-primary',
        modalId: 'mobile-modal',
        callback: (mobile: MobileModel) => this.goToEdit(mobile),
        // visibleFn: (mobile: MobileModel) => mobile.contracts.data.length == 0
      }
    ],
    actionButtons: [
      {
        i18nKey: 'btn-add',
        icon: 'fe-plus',
        class: 'btn-primary',
        modalId: 'mobile-modal',
        callback: (mobile: MobileModel) => this.goToAdd()
      }
    ]
  };

  visibleModal: boolean;

  constructor(
    private sandbox: MobilesSandbox,
    private service: MobilesService,
    private configService: MobilesConfigService,
    private filterFactory: BaseTableFilterFactoryService,
    private codeTablesService: CodeTablesService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.sandbox.mobilesLoading$;
    this.entities$ = this.sandbox.mobiles$;
    this.paginationInfo$ = this.sandbox.mobilesPaginationInfo$;

    this.sandbox.loadMobiles();

    this.loadUnits()
  }

  ngOnDestroy(): void {
    this.sandbox.clearSearchTerms();
  }

  private filterDataLoaded(
    data: any[],
    sub$: Subscription,
    filterName: string,
    disabled?
  ) {
    this.tableConfig = this.filterFactory.updateFilterInTableConfig(
      data,
      this.tableConfig,
      filterName,
      false,
      'primary',
      'col-md-4',
      disabled
    );
  }

  loadUnits() {
    const sub$ = this.codeTablesService.getCodeTableByKey(this.codeTablesService.availableTableKeys.Units)
      .subscribe(response => {
        let data = [];
        response.map(item => data.push({ id: item.code, name: item.name }));
        this.filterDataLoaded(data, sub$, 'unit', false);
        this.tableConfig.columns = this.configService.getListColumns(response);
      });
  }

  search(terms: any) {
    this.sandbox.search(terms);
    this.sandbox.loadMobiles();
  }

  loadPage(pageEvent) {
    this.sandbox.loadMobiles(pageEvent);
  }

  private goToAdd() {
    this.sandbox.setActiveMobile(this.service.newEntity);
    this.sandbox.showModal();
  }

  goToEdit(entity) {
    this.sandbox.setActiveMobile(entity);
    this.sandbox.showModal();
  }

}
