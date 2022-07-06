import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';
import {
  BaseTableConfiguration
} from 'src/app/common/components/base-table/base-table-config';
import { SimModel } from '../../models/sim.model';
import { SimsSandbox } from '../../sims.sandbox';
import { SimsConfigService } from '../../services/sims-config.service';
import { BaseTableFilterFactoryService } from 'src/app/common/services/base-table-filter-factory.service';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { SimsService } from '../../services/sims.service';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
  selector: 'app-sims-page',
  templateUrl: './sims-page.component.html'
})
export class SimsPageComponent implements OnInit, OnDestroy {

  entities$: Observable<SimModel[]>;
  isLoading$: Observable<boolean>;
  paginationInfo$: Observable<ServerPaginationInfo>;

  tableConfig: BaseTableConfiguration = {
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters(),
    useHeaderTemplate: true,
    rowActionButtons: [
      {
        tooltipI18nKey: 'sims-page.list-btn.delete',
        icon: 'fe-trash',
        class: 'text-primary',
        callback: (sim: SimModel) => this.sandbox.deleteSim(sim),
        // visibleFn: (sim: SimModel) => sim.contracts.data.length == 0
      },
      {
        tooltipI18nKey: 'btn-edit',
        icon: 'fe-edit-2',
        class: 'text-primary',
        modalId: 'sim-modal',
        callback: (sim: SimModel) => this.goToEdit(sim),
        // visibleFn: (sim: SimModel) => sim.contracts.data.length == 0
      }
    ],
    actionButtons: [
      {
        i18nKey: 'btn-add',
        icon: 'fe-plus',
        class: 'btn-primary',
        modalId: 'sim-modal',
        callback: (sim: SimModel) => this.goToAdd()
      }
    ]
  };

  visibleModal: boolean;

  constructor(
    private sandbox: SimsSandbox,
    private service: SimsService,
    private configService: SimsConfigService,
    private filterFactory: BaseTableFilterFactoryService,
    private codeTablesService: CodeTablesService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.sandbox.simsLoading$;
    this.entities$ = this.sandbox.sims$;
    this.paginationInfo$ = this.sandbox.simsPaginationInfo$;

    this.sandbox.loadSims();

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
    this.sandbox.loadSims();
  }

  loadPage(pageEvent) {
    this.sandbox.loadSims(pageEvent);
  }

  private goToAdd() {
    this.sandbox.setActiveSim(this.service.newEntity);
    this.sandbox.showModal();
  }

  goToEdit(entity) {
    this.sandbox.setActiveSim(entity);
    this.sandbox.showModal();
  }

}
