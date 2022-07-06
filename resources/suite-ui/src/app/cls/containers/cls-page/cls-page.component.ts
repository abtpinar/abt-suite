import { Observable, of, Subscription } from 'rxjs';
import { Component, Injector, OnInit, Type, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../i18n/services/language.service';
import { NotificationService } from '../../../common/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';
import {
  BaseTableConfiguration, FilterInput,
} from 'src/app/common/components/base-table/base-table-config';
import { CLModel, CLStates } from '../../models/cl.model';
import { CLsSandbox } from '../../cls.sandbox';
import { CLsConfigService } from '../../services/cls-config.service';
import { BaseTableFilterFactoryService } from 'src/app/common/services/base-table-filter-factory.service';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { CLsService } from '../../services/cls.service';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
  selector: 'app-cls-page',
  templateUrl: './cls-page.component.html'
})
export class CLsPageComponent implements OnInit, OnDestroy {

  entities$: Observable<CLModel[]>;
  isLoading$: Observable<boolean>;
  paginationInfo$: Observable<ServerPaginationInfo>;
  searchTerms$;

  isProcessing$: Observable<boolean>;

  viewUnits: boolean = false;

  public excelConfiguration = this.service.getExportConfiguration(
    'application/vnd.ms-excel',
    'excel'
  );

  tableConfig: BaseTableConfiguration = {
    columns: this.configService.getListColumns(this.viewUnits),
    searchConfig: this.configService.getListFilters(this.viewUnits),
    useHeaderTemplate: true,
    rowActionButtons: [
      {
        tooltipI18nKey: 'cls-results-page.list-btn.process',
        icon: 'fe-check',
        class: 'text-primary',
        callback: (cl: CLModel) => this.processCL(cl),
        visibleFn: (cl: CLModel) => ['IMPORTED', 'UPDATED'].includes(cl.status)
      },
      {
        tooltipI18nKey: 'cls-results-page.list-btn.adjust',
        icon: 'fe-pie-chart',
        class: 'text-primary',
        modalId: 'cls-expense-modal',
        callback: (cl: CLModel) => this.goToAdd([cl]),
        visibleFn: (cl: CLModel) => ['IN_PROGRESS', 'REFUNDED'].includes(cl.status),
        disabledFn: (cl: CLModel) => !['IN_PROGRESS', 'REFUNDED'].includes(cl.status)
      },
      {
        tooltipI18nKey: 'cls-results-page.list-btn.refund',
        icon: 'fe-rotate-ccw',
        class: 'text-primary',
        modalId: 'cls-refund-modal',
        callback: (cl: CLModel) => this.refund([cl]),
        visibleFn: (cl: CLModel) => ['FIXED_FEE', 'PAID', 'FINISHED'].includes(cl.status),
        disabledFn: (cl: CLModel) => ['PAID', 'FINISHED'].includes(cl.status)
      },
      {
        tooltipI18nKey: 'cls-results-page.list-btn.retire',
        icon: 'fe-credit-card',
        class: 'text-primary',
        modalId: 'cls-payment-modal',
        callback: (cl: CLModel) => this.goToAdd([cl]),
        disabledFn: (cl: CLModel) => !['FIXED_FEE', 'PAID'].includes(cl.status) || this.configService.availableAmount(cl) <= 0
      }
    ],
    actionButtons: [
      // {
      //   i18nKey: 'btn-add',
      //   icon: 'fe-plus',
      //   class: 'btn-primary',
      //   callback: (cl: CLModel) => this.goTo(cl)
      // },
      // {
      //   i18nKey: 'cls-page.list-btn.download-template',
      //   icon: 'fe-download',
      //   class: 'btn-secondary ml-5',
      //   callback: (cl: CLModel) => this.goTo(cl)
      // },
      // {
      //   i18nKey: 'cls-page.list-btn.upload-template',
      //   icon: 'fe-upload',
      //   class: 'btn-secondary ml-2',
      //   callback: (cl: CLModel) => this.goTo(cl)
      // }
    ]
  };

  constructor(
    protected router: Router,
    protected languageService: LanguageService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    private sandbox: CLsSandbox,
    private configService: CLsConfigService,
    private service: CLsService,
    private filterFactory: BaseTableFilterFactoryService,
    private codeTablesService: CodeTablesService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.sandbox.clsLoading$;
    this.entities$ = this.sandbox.cls$;
    this.paginationInfo$ = this.sandbox.clsPaginationInfo$;
    this.searchTerms$ = this.sandbox.clSearchTerms$;

    this.isProcessing$ = this.sandbox.clsProcessing$;

    this.sandbox.loadCLs();

    this.loadUnits();
    this.loadTypes();
    this.loadStatus();
  }

  ngOnDestroy(): void {
    this.sandbox.clearSearchTerms();
  }

  showUnits() {
    this.viewUnits = !this.viewUnits;
    this.tableConfig.columns = this.configService.getListColumns(this.viewUnits);
    this.tableConfig.searchConfig = this.configService.getListFilters(this.viewUnits);
    if (this.viewUnits) {
      this.search({type: 'U'});
    } else {
      this.search({});
    }

    this.loadUnits();
    this.loadTypes();
    this.loadStatus();
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
    const sub$ = this.sandbox.availableUnits$
      .subscribe((response: CLModel[]) => {
        let data = [];
        response.map(item => data.push({ id: item.unit_id, name: item.unit_name }));
        this.filterDataLoaded(data, sub$, 'unit', false);
      });
  }

  loadTypes() {
    let data = [
      { id: 'T', name: 'Tapado' },
      { id: 'S', name: 'Sol' }
    ];

    this.filterDataLoaded(data, null, 'type', false);
  }

  loadStatus() {
    let data = [];
    const props = Object.keys(CLStates);
    props.forEach(element => {
      data.push({ id: CLStates[element], name: this.languageService.translate(`cls-results-page.cl.status.${CLStates[element]}`) });
    });
    this.filterDataLoaded(data, null, 'status', false);
  }

  search(terms: any) {
    this.sandbox.search(terms);
    this.sandbox.loadCLs();
  }

  loadPage(pageEvent) {
    this.sandbox.loadCLs(pageEvent);
  }

  get noCLsToAction() {
    return this.configService.clsMarkedForAction.length === 0;
  }

  private goToAdd(cls: CLModel[]) {
    if (cls.length > 0) {
      this.sandbox.setActiveCls(cls);
      this.sandbox.showModal();
    } else {
      this.configService.clearMarkedCls();
    }
  }

  private refund(cls: CLModel[]) {
    if (cls.length > 0) {
      this.sandbox.setActiveCls(cls);
      this.sandbox.showModal();
    } else {
      this.configService.clearMarkedCls();
    }
  }

  addExpense(cls) {
    const ids = this.configService.clsMarkedForAction.map(r => r.id);
    this.goToAdd(cls.filter(element => ids.includes(element.id) && element.status == 'IN_PROGRESS'));
  }

  addPayment(cls) {
    const ids = this.configService.clsMarkedForAction.map(r => r.id);
    this.goToAdd(cls.filter(element => ids.includes(element.id) && ['FIXED_FEE', 'PAID'].includes(element.status) && this.configService.finalAmount(element) > 0));
  }

  processCL(cl: CLModel) {
    this.sandbox.processSelectedCLs([cl.id]);
  }

  processSelectedCLs() {
    const ids = this.configService.clsMarkedForAction.map(r => r.id);
    this.sandbox.processSelectedCLs(ids);
    this.configService.clearMarkedCls();
  }

  adjustSelectedCLs() {
    const downloadIds = this.configService.clsMarkedForAction.map(r => r.id);
    // this.sandbox.sendSelectedInvoices(downloadIds);
    this.configService.clearMarkedCls();
    this.sandbox.loadCLs();
  }

  updateFromSIPAC() {
    this.sandbox.updateFromSIPAC();
  }

  downloadPDF(): void {
    this.isLoading$ = of(true);
    this.service.downloadPDF().subscribe(
      () => {
        this.isLoading$ = of(false);
      },
      error => {
        console.log(error);
        this.isLoading$ = of(false);
        const msg = this.languageService.translate(
          'product-list.product-template-download-error'
        );
        this.notificationService.showError(msg);
      }
    );
  }

}
