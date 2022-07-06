import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { BaseTableConfiguration } from '../../../common/components/base-table/base-table-config';
import { EmployeesSandbox } from '../../../employees/employees.sandbox';
import { Observable, Subscription } from 'rxjs';
import { ServerPaginationInfo } from '../../../common/models/ServerPaginationInfo';
import { EmployeeModel } from '../../../employees/models/employee.model';
import { EmployeesConfigService } from 'src/app/employees/services/employees-config.service';
import {DEFAULT_PAGE_SIZE, PaginationInfo} from '../../pagination';

// To use jquery function in component
declare var $: any;

@Component({
  selector: 'app-employee-selection-modal',
  templateUrl: './employee-selection-modal.component.html',
  styleUrls: ['./employee-selection-modal.component.sass']
})
export class EmployeeSelectionModalComponent implements OnInit, OnDestroy {
  tableConfig: BaseTableConfiguration = {
    containerClasses: 'p-0',
    autoLayout: true,
    noDataMessage: 'table-empty-data',
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters()
  };

  isLoading$: Observable<boolean>;

  employees$: Observable<EmployeeModel[]>;

  includes = 'shipments,contacts,retrieves';
  paginationInfo: PaginationInfo = {
    page: 1,
    itemsPerPage: DEFAULT_PAGE_SIZE
  };

  paginationInfo$: Observable<ServerPaginationInfo>;

  autocloseModalSubs$: Subscription;

  @Output() selectEmployee = new EventEmitter<EmployeeModel>();
  @Output() closeEvent = new EventEmitter();

  sector: string;

  constructor(
    private employeeSandbox: EmployeesSandbox,
    private configService: EmployeesConfigService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.employeeSandbox.employeesLoading$;
    this.employees$ = this.employeeSandbox.employees$;
    this.paginationInfo$ = this.employeeSandbox.employeesPaginationInfo$;
    // this.onSearch({});
    this.employeeSandbox.loadEmployees(this.paginationInfo);

    // this.autocloseModalSubs$ = this.employeeSandbox.uiModalOpen$.subscribe(
    //   isOpen => !isOpen && this.modalRef.hide()
    // );

    this.tableConfig.searchConfig = this.configService.getListFilters();
  }

  ngOnDestroy(): void {
    // this.autocloseModalSubs$.unsubscribe();
  }

  setSelectedEmployee(employee: EmployeeModel) {
    this.selectEmployee.emit(employee);
    // this.modalRef.hide();
    // this.employeeSandbox.closeModal();
    $('#employee-selection-modal').modal('hide');
  }

  close() {
    // this.modalRef.hide();
    // this.employeeSandbox.closeModal();
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
    this.employeeSandbox.search(terms, {...this.paginationInfo, page: 1});
  }

  loadPage(pageEvent: PaginationInfo) {
    this.paginationInfo = {...pageEvent};
    this.employeeSandbox.loadEmployees(this.paginationInfo);
  }
}
