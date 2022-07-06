import { Observable, Subscription } from 'rxjs';
import { Component, Injector, OnInit, Type, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../i18n/services/language.service';
import { NotificationService } from '../../../common/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';
import {
  BaseTableConfiguration, FilterInput,
} from 'src/app/common/components/base-table/base-table-config';
import {CLPaymentModel} from '../../models/cl-payment.model';
import {CLPaymentsSandbox} from '../../cl-payments.sandbox';
import {CLPaymentsConfigService} from '../../services/cl-payments-config.service';
import { BaseTableFilterFactoryService } from 'src/app/common/services/base-table-filter-factory.service';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { CLPaymentsService } from '../../services/cl-payments.service';
import { Store } from '@ngrx/store';
import { SharedState } from 'src/app/@rootStore/reducers/shared.reducer';
import { DownloadFile } from 'src/app/@rootStore/actions';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
  selector: 'app-cl-payments-page',
  templateUrl: './cl-payments-page.component.html'
})
export class CLPaymentsPageComponent implements OnInit, OnDestroy {

  entities$: Observable<CLPaymentModel[]>;
  isLoading$: Observable<boolean>;
  paginationInfo$: Observable<ServerPaginationInfo>;

  public excelConfiguration = this.service.getExportConfiguration(
    'application/vnd.ms-excel',
    'excel'
  );

  tableConfig: BaseTableConfiguration = {
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters(),
    useHeaderTemplate: true,
    rowActionButtons: [
      {
        tooltipI18nKey: 'cls-page.list-btn.create-contract',
        icon: 'fe-download',
        class: 'text-primary',
        callback: (cl: CLPaymentModel) => this.exportExcel(cl),
        // visibleFn: (cl: CLPaymentModel) => ['IMPORTED', 'UPDATED'].includes(cl.status)
      },
      // {
      //   tooltipI18nKey: 'cls-page.list-btn.create-contract',
      //   icon: 'fe-eye',
      //   class: 'text-primary',
      //   callback: (cl: CLPaymentModel) => this.goTo(cl),
      //   // visibleFn: (cl: CLPaymentModel) => ['IMPORTED', 'UPDATED'].includes(cl.status)
      // },
      // {
      //   tooltipI18nKey: 'cls-page.list-btn.create-contract',
      //   icon: 'fe-pie-chart',
      //   class: 'text-primary',
      //   callback: (cl: CLPaymentModel) => this.goTo(cl),
      //   visibleFn: (cl: CLPaymentModel) => !['IMPORTED', 'UPDATED'].includes(cl.status),
      //   disabledFn: (cl: CLPaymentModel) => !['PROCESADO'].includes(cl.status)
      // },
      // {
      //   tooltipI18nKey: 'cls-page.list-btn.create-contract',
      //   icon: 'fe-dollar-sign',
      //   class: 'text-primary',
      //   callback: (cl: CLPaymentModel) => this.goTo(cl),
      //   disabledFn: (cl: CLPaymentModel) => !['AJUSTADO', 'PAGADO_PARCIALMENTE'].includes(cl.status)
      // }
    ],
    actionButtons: [
      // {
      //   i18nKey: 'btn-add',
      //   icon: 'fe-plus',
      //   class: 'btn-primary',
      //   callback: (cl: CLPaymentModel) => this.goTo(cl)
      // },
      // {
      //   i18nKey: 'cls-page.list-btn.download-template',
      //   icon: 'fe-download',
      //   class: 'btn-secondary ml-5',
      //   callback: (cl: CLPaymentModel) => this.goTo(cl)
      // },
      // {
      //   i18nKey: 'cls-page.list-btn.upload-template',
      //   icon: 'fe-upload',
      //   class: 'btn-secondary ml-2',
      //   callback: (cl: CLPaymentModel) => this.goTo(cl)
      // }
    ]
  };

  constructor(
    protected router: Router,
    protected languageService: LanguageService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    private sandbox: CLPaymentsSandbox,
    private configService: CLPaymentsConfigService,
    private service: CLPaymentsService,
    private filterFactory: BaseTableFilterFactoryService,
    private codeTablesService: CodeTablesService,
    private sharedStore$: Store<SharedState>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.sandbox.clsLoading$;
    this.entities$ = this.sandbox.cls$;
    this.paginationInfo$ = this.sandbox.clsPaginationInfo$;

    this.sandbox.loadCLPayments();

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
        response.map(item => data.push({id: item.code, name: item.name}));
        this.filterDataLoaded(data, sub$, 'unit', false);
        this.tableConfig.columns = this.configService.getListColumns(response);
      });
  }

  search(terms: any) {
    this.sandbox.search(terms);
    this.sandbox.loadCLPayments();
  }

  loadPage(pageEvent) {
    this.sandbox.loadCLPayments(pageEvent);
  }

  private goTo(cl: CLPaymentModel) {
    this.router.navigateByUrl(`cls`);
  }

  exportExcel(payment) {
    this.sharedStore$.dispatch(new DownloadFile({
      downloadUrl: this.excelConfiguration.url,
      fileName: this.excelConfiguration.fileName,
      mimeType: this.excelConfiguration.mimeType,
      searchTerms: {id:payment.id}
    }));
  }

}
