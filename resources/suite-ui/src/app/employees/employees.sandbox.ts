import { Injectable } from '@angular/core';
import { Sandbox } from '../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { EmployeeModel } from './models/employee.model';
import { ServerPaginationInfo } from '../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../common/pagination';

@Injectable({
  providedIn: 'root'
})
export class EmployeesSandbox extends Sandbox {

  employeesLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectEmployeesLoading)
  );

  employees$: Observable<EmployeeModel[]> = this.store$.pipe(
    select(fromStore.selectAllEmployees)
  );

  employeesPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectEmployeesPaginationInfo)
  );

  employeeSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectEmployeesSearchTerms)
  );

  /**
   * Gets the employee from the activatedRoute or returns null if there
   * is no employee with and id equals to the one in the route
   */
  public activeEmployee$: Observable<EmployeeModel> = this.store$.pipe(
    select(fromStore.selectActiveEmployee)
  );

  constructor(
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.EmployeeFeatureState>) {
    super(rootStore$);
  }

  loadEmployees(paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.LoadEmployees(paginationInfo));
  }

  search(terms, paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.SetSearchTerms(terms));
    this.loadEmployees(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearSearchTerms());
  }

  deleteEmployee(employee: EmployeeModel): void {
    this.store$.dispatch(new fromStore.DeleteEmployee(employee));
  }

  addEmployee(employee: EmployeeModel): void {
    this.store$.dispatch(new fromStore.AddEmployee(employee));
  }

  updateEmployee(employee: EmployeeModel): any {
    this.store$.dispatch(new fromStore.UpdateEmployee(employee));
  }

  setActiveEmployee(employee: EmployeeModel) {
    this.store$.dispatch(new fromStore.SetActiveEmployee(employee));
  }

}
