import {Observable, Subscription} from 'rxjs';
import {Component, Injector, OnInit, Type, OnDestroy} from '@angular/core';
import {LanguageService} from '../../../i18n/services/language.service';
import {NotificationService} from '../../../common/services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {ServerPaginationInfo} from 'src/app/common/models/ServerPaginationInfo';
import {
  BaseTableConfiguration, FilterInput,
} from 'src/app/common/components/base-table/base-table-config';
import {CommunicationContractModel} from '../../models/communication-contract.model';
import {CommunicationContractsSandbox} from '../../communication-contracts.sandbox';
import {CommunicationContractsConfigService} from '../../services/communication-contracts-config.service';
import {BaseTableFilterFactoryService} from 'src/app/common/services/base-table-filter-factory.service';
import {CodeTablesService} from 'src/app/common/services/code-tables.service';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
  selector: 'app-contracts-page',
  templateUrl: './communication-contracts-page.component.html'
})
export class CommunicationContractsPageComponent implements OnInit, OnDestroy {

  entities$: Observable<CommunicationContractModel[]>;
  isLoading$: Observable<boolean>;
  paginationInfo$: Observable<ServerPaginationInfo>;

  tableConfig: BaseTableConfiguration = {
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters(),
    useHeaderTemplate: true,
    rowActionButtons: [
      {
        tooltipI18nKey: 'communication-contracts-page.list-btn.create-version',
        icon: 'fe-git-merge',
        class: 'text-primary',
        callback: (contract: CommunicationContractModel) => this.goTo(contract),
        visibleFn: (contract: CommunicationContractModel) => contract.state == this.configService.contractStates.Activated
      },
      {
        tooltipI18nKey: 'communication-contracts-page.list-btn.download-pdf',
        icon: 'fe-download',
        class: 'text-primary',
        callback: (contract: CommunicationContractModel) => this.goTo(contract),
        visibleFn: (contract: CommunicationContractModel) => contract.state != this.configService.contractStates.InProgress
      },
      {
        tooltipI18nKey: 'communication-contracts-page.list-btn.download-pdf',
        icon: 'fe-check',
        classFn: (contract: CommunicationContractModel) => this.getBtnColor(contract),
        callback: (contract: CommunicationContractModel) => this.goTo(contract),
        visibleFn: (contract: CommunicationContractModel) => contract.state == this.configService.contractStates.InProgress || contract.state == this.configService.contractStates.Accepted
      }
    ],
    actionButtons: [
      // {
      //   i18nKey: 'btn-add',
      //   icon: 'fe-plus',
      //   class: 'btn-primary mr-3',
      //   callback: (contract: CommunicationContractModel) => this.goTo(contract)
      // }
    ]
  };

  constructor(protected router: Router,
              protected languageService: LanguageService,
              protected notificationService: NotificationService,
              protected authService: AuthService,
              private sandbox: CommunicationContractsSandbox,
              private configService: CommunicationContractsConfigService,
              private filterFactory: BaseTableFilterFactoryService,
              private codeTablesService: CodeTablesService) {
  }

  ngOnInit() {
    this.isLoading$ = this.sandbox.contractsLoading$;
    this.entities$ = this.sandbox.contracts$;
    this.paginationInfo$ = this.sandbox.contractsPaginationInfo$;

    this.sandbox.loadCommunicationContracts();

    this.loadUnits()
  }

  ngOnDestroy(): void {
    this.sandbox.clearSearchTerms();
  }

  getBtnColor(contract) {
    if (contract.state == this.configService.contractStates.InProgress)
      return 'text-info';
    else if (contract.state == this.configService.contractStates.Accepted)
      return 'text-success';
    else
      return 'text-primary'
  }

  private filterDataLoaded(data: any[],
                           sub$: Subscription,
                           filterName: string,
                           disabled?) {
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
    this.sandbox.loadCommunicationContracts();
  }

  loadPage(pageEvent) {
    this.sandbox.loadCommunicationContracts(pageEvent);
  }

  private goTo(contract: CommunicationContractModel) {
    this.router.navigateByUrl(`contracts`);
  }

  goToEdit(contract: CommunicationContractModel) {
    this.sandbox.setActiveCommunicationContract(contract);
    this.router.navigateByUrl(
      `/communication-contracts/edit/${contract.employee.data.id}/${contract.id}`
    );
  }

}
