import { Action } from '@ngrx/store';

import * as constants from '../constants/employee.constant';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { EmployeeModel } from '../../models/employee.model';
import { PaginationInfo } from '../../../common/pagination';

export class LoadEmployees implements Action {
  readonly type = constants.LOAD_EMPLOYEES;
  constructor(public payload: PaginationInfo) {}
}

export class LoadEmployeesFail implements Action {
  readonly type = constants.LOAD_EMPLOYEES_FAIL;
  constructor(public payload: any) {}
}

export class LoadEmployeesSuccess implements Action {
  readonly type = constants.LOAD_EMPLOYEES_SUCCESS;
  constructor(public payload: ServerResponse<EmployeeModel>) {}
}

export class LoadEmployee implements Action {
  readonly type = constants.LOAD_EMPLOYEE;
  constructor(public payload: number) {}
}

export class LoadEmployeeFail implements Action {
  readonly type = constants.LOAD_EMPLOYEE_FAIL;
  constructor(public payload: any) {}
}

export class LoadEmployeeSuccess implements Action {
  readonly type = constants.LOAD_EMPLOYEE_SUCCESS;
  constructor(public payload: EmployeeModel) {}
}

// DELETE
export class DeleteEmployee implements Action {
  readonly type = constants.DELETE_EMPLOYEE;
  constructor(public payload: EmployeeModel) {}
}

export class DeleteEmployeeFail implements Action {
  readonly type = constants.DELETE_EMPLOYEE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteEmployeeSuccess implements Action {
  readonly type = constants.DELETE_EMPLOYEE_SUCCESS;
  constructor(public payload: EmployeeModel) {}
}

export class AddEmployee implements Action {
  readonly type = constants.ADD_EMPLOYEE;
  constructor(public payload: EmployeeModel) {}
}

export class AddEmployeeFail implements Action {
  readonly type = constants.ADD_EMPLOYEE_FAIL;
  constructor(public payload: any) {}
}

export class AddEmployeeSuccess implements Action {
  readonly type = constants.ADD_EMPLOYEE_SUCCESS;
}

export class UpdateEmployee implements Action {
  readonly type = constants.UPDATE_EMPLOYEE;
  constructor(public payload: EmployeeModel) {}
}

export class UpdateEmployeeFail implements Action {
  readonly type = constants.UPDATE_EMPLOYEE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateEmployeeSuccess implements Action {
  readonly type = constants.UPDATE_EMPLOYEE_SUCCESS;
  constructor(public payload: EmployeeModel) {}
}

export class SetActiveEmployee implements Action {
  readonly type = constants.SET_ACTIVE_EMPLOYEE;
  constructor(public payload: EmployeeModel) {}
}

// SEARCH
export class SetSearchTerms implements Action {
  readonly type = constants.SET_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearSearchTerms implements Action {
  readonly type = constants.CLEAR_SEARCH_TERMS;
}

export type employeeActions =
  | LoadEmployees
  | LoadEmployeesFail
  | LoadEmployeesSuccess
  | LoadEmployee
  | LoadEmployeeFail
  | LoadEmployeeSuccess
  | AddEmployee
  | AddEmployeeFail
  | AddEmployeeSuccess
  | UpdateEmployee
  | UpdateEmployeeFail
  | UpdateEmployeeSuccess
  | DeleteEmployee
  | DeleteEmployeeFail
  | DeleteEmployeeSuccess
  | SetActiveEmployee
  | SetSearchTerms
  | ClearSearchTerms;
