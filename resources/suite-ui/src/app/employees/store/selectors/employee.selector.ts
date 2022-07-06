import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromEmployee from '../reducers/employee.reducer';

export const getEmployees = createSelector(
  fromFeature.selectEmployeesFeatureState,
  (state: fromFeature.EmployeeFeatureState) => state.employees
);

export const selectEmployeesEntities = createSelector(
  getEmployees,
  fromEmployee.selectEmployeeEntities
);

export const selectEmployeesIds = createSelector(
  getEmployees,
  fromEmployee.selectEmployeeIds
);

export const selectAllEmployees = createSelector(
  getEmployees,
  fromEmployee.selectAllEmployees
);

export const selectEmployeesTotal = createSelector(
  getEmployees,
  fromEmployee.selectEmployeeTotal
);

export const selectEmployeesLoaded = createSelector(
  getEmployees,
  fromEmployee.selectEmployeesLoaded
);

export const selectEmployeesLoading = createSelector(
  getEmployees,
  fromEmployee.selectEmployeesLoading
);

export const selectEmployeesPaginationInfo = createSelector(
  getEmployees,
  fromEmployee.selectEmployeesPaginationInfo
);

export const selectEmployeesSearchTerms = createSelector(
  getEmployees,
  fromEmployee.selectEmployeesSearchTerms
);

export const selectActiveEmployee = createSelector(
  getEmployees,
  fromEmployee.selectActiveEmployee
);
