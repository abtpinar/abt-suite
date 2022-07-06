import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromEmployee from './employee.reducer';

export interface EmployeeFeatureState {
  employees: fromEmployee.State;
}

export const reducers: ActionReducerMap<EmployeeFeatureState> = {
  employees: fromEmployee.reducer
};

export const selectEmployeesFeatureState = createFeatureSelector<
  EmployeeFeatureState
>('employeesFeatureState');
