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
import {EmployeeModel} from '../../models/employee.model';
import {EmployeesSandbox} from '../../employees.sandbox';
import {EmployeesConfigService} from '../../services/employees-config.service';
import { BaseTableFilterFactoryService } from 'src/app/common/services/base-table-filter-factory.service';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { TableCode } from 'src/app/common/models/table-code.model';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html'
})
export class EmployeesPageComponent implements OnInit, OnDestroy {

  entities$: Observable<EmployeeModel[]>;
  isLoading$: Observable<boolean>;
  paginationInfo$: Observable<ServerPaginationInfo>;

  private tableCodesSubs$: Subscription;
  private combinedTableCodes: { [key: string]: TableCode[] };

  tableConfig: BaseTableConfiguration = {
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters(),
    useHeaderTemplate: true,
    rowActionButtons: [
      {
        tooltipI18nKey: 'employees-page.list-btn.delete',
        icon: 'fe-trash',
        class: 'text-primary',
        callback: (employee: EmployeeModel) => this.sandbox.deleteEmployee(employee),
        visibleFn: (employee: EmployeeModel) => employee.communication_contracts.data.length == 0
      },
      {
        tooltipI18nKey: 'employees-page.list-btn.create-contract',
        icon: 'fe-briefcase',
        class: 'text-primary',
        callback: (employee: EmployeeModel) => this.goToCreateContract(employee),
        visibleFn: (employee: EmployeeModel) => employee.communication_contracts.data.length == 0
      }
    ],
    actionButtons: [
      {
        i18nKey: 'btn-add',
        icon: 'fe-plus',
        class: 'btn-primary',
        callback: (employee: EmployeeModel) => this.goToAdd()
      },
      // {
      //   i18nKey: 'employees-page.list-btn.download-template',
      //   icon: 'fe-download',
      //   class: 'btn-secondary ml-5',
      //   callback: (product: EmployeeModel) => this.goTo(product)
      // },
      // {
      //   i18nKey: 'employees-page.list-btn.upload-template',
      //   icon: 'fe-upload',
      //   class: 'btn-secondary ml-2',
      //   callback: (product: EmployeeModel) => this.goTo(product)
      // }
    ]
  };

  constructor(
    protected router: Router,
    protected languageService: LanguageService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    private sandbox: EmployeesSandbox,
    private configService: EmployeesConfigService,
    private filterFactory: BaseTableFilterFactoryService,
    private codeTablesService: CodeTablesService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.sandbox.employeesLoading$;
    this.entities$ = this.sandbox.employees$;
    this.paginationInfo$ = this.sandbox.employeesPaginationInfo$;

    this.sandbox.loadEmployees();

    this.tableCodesSubs$ = this.codeTablesService
      .getCombinedTablesByKeys([
        this.codeTablesService.availableTableKeys.Departments,
        this.codeTablesService.availableTableKeys.Occupations
      ]).subscribe(({combinedTableCodes}) => {
        this.combinedTableCodes = combinedTableCodes;
        // let data = [];
        // response.map(item => data.push({id: item.code, name: item.name}));
        // this.filterDataLoaded(data, sub$, 'department', false);
        this.tableConfig.columns = this.configService.getListColumns(combinedTableCodes);
      });
  }

  ngOnDestroy(): void {
    this.tableCodesSubs$.unsubscribe();
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
    this.sandbox.loadEmployees();
  }

  loadPage(pageEvent) {
    this.sandbox.loadEmployees(pageEvent);
  }

  private goToAdd() {
    this.router.navigateByUrl(`employees/new`);
  }

  goToEdit(employee) {
    this.sandbox.setActiveEmployee(employee);
    this.router.navigateByUrl(`employees/edit/${employee.id}`);
  }

  private goToCreateContract(employee: EmployeeModel) {
    this.router.navigateByUrl(`/communication-contracts/createFromEmployee/${employee.id}`);
  }

}
