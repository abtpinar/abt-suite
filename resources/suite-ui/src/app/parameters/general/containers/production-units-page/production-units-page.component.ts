import { Observable, Subscription } from 'rxjs';
import { Component, Injector, OnInit, Type, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../../i18n/services/language.service';
import { NotificationService } from '../../../../common/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';
import {
  BaseTableConfiguration, FilterInput,
} from 'src/app/common/components/base-table/base-table-config';
import {ProductionUnitModel} from '../../models/production-unit.model';
import {ProductionUnitsSandbox} from '../../production-units.sandbox';
import {ProductionUnitsConfigService} from '../../services/production-units-config.service';
import { BaseTableFilterFactoryService } from 'src/app/common/services/base-table-filter-factory.service';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { ProductionUnitsService } from '../../services/production-units.service';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
  selector: 'app-production-units-page',
  templateUrl: './production-units-page.component.html'
})
export class ProductionUnitsPageComponent implements OnInit, OnDestroy {

  entities$: Observable<ProductionUnitModel[]>;
  isLoading$: Observable<boolean>;
  paginationInfo$: Observable<ServerPaginationInfo>;

  tableConfig: BaseTableConfiguration = {
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters(),
    useHeaderTemplate: true,
    rowActionButtons: [
      {
        tooltipI18nKey: 'btn-edit',
        icon: 'fe-edit-2',
        class: 'text-primary',
        modalId: 'production-unit-modal',
        callback: (tProductionUnit: ProductionUnitModel) => this.goToEdit(tProductionUnit),
        // visibleFn: (class: ProductionUnitModel) => production-unit.contracts.data.length == 0
      }
    ],
    actionButtons: [
      {
        i18nKey: 'btn-add',
        icon: 'fe-plus',
        class: 'btn-primary',
        modalId: 'production-unit-modal',
        callback: () => this.goToAdd()
      }
    ]
  };

  constructor(
    protected router: Router,
    protected languageService: LanguageService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    private sandbox: ProductionUnitsSandbox,
    private configService: ProductionUnitsConfigService,
    private service: ProductionUnitsService,
    private filterFactory: BaseTableFilterFactoryService,
    private codeTablesService: CodeTablesService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.sandbox.classesLoading$;
    this.entities$ = this.sandbox.classes$;
    this.paginationInfo$ = this.sandbox.classesPaginationInfo$;

    this.sandbox.loadProductionUnits();
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

  search(terms: any) {
    this.sandbox.search(terms);
    this.sandbox.loadProductionUnits();
  }

  loadPage(pageEvent) {
    this.sandbox.loadProductionUnits(pageEvent);
  }

  private goToAdd() {
    this.sandbox.setActiveProductionUnit(this.service.newEntity);
    this.sandbox.showModal();
  }

  goToEdit(tProductionUnit) {
    this.sandbox.setActiveProductionUnit(tProductionUnit);
    this.sandbox.showModal();
  }

}
