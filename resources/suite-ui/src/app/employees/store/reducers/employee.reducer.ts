import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/employee.constant';
import * as actionCreators from '../actions/employee.action';
import { EmployeeModel } from '../../models/employee.model';
import { ServerPaginationInfo } from '../../../common/models/ServerPaginationInfo';

export interface State extends EntityState<EmployeeModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  activeEmployee: EmployeeModel;
}

export const adapter: EntityAdapter<EmployeeModel> = createEntityAdapter<EmployeeModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  activeEmployee: null
});

export function reducer(
  state = initialState,
  action: actionCreators.employeeActions
) {
  switch (action.type) {
    
    case actionConstants.ADD_EMPLOYEE:
    case actionConstants.UPDATE_EMPLOYEE:
    case actionConstants.DELETE_EMPLOYEE:
    case actionConstants.LOAD_EMPLOYEE:
    case actionConstants.LOAD_EMPLOYEES: {
      return { ...state, loading: true };
    }

    case actionConstants.ADD_EMPLOYEE_FAIL:
    case actionConstants.UPDATE_EMPLOYEE_FAIL:
    case actionConstants.DELETE_EMPLOYEE_FAIL:
    case actionConstants.LOAD_EMPLOYEE_FAIL:
    case actionConstants.LOAD_EMPLOYEES_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_EMPLOYEES_SUCCESS: {
      const serverResponse = action.payload;
      const { data, meta } = serverResponse.response;
      const { pagination: paginationInfo } = meta;
      return adapter.addAll(data, {
        ...state,
        loaded: true,
        loading: false,
        paginationInfo
      });
    }

    case actionConstants.DELETE_EMPLOYEE_SUCCESS: {
      const deletedItem = action.payload;
      return adapter.removeOne(deletedItem.id, { ...state, loading: false });
    }

    case actionConstants.UPDATE_EMPLOYEE_SUCCESS: {
      const updatedItem = action.payload;
      return adapter.updateOne(
        {
          id: updatedItem.id,
          changes: { ...updatedItem }
        },
        { ...state }
      );
    }

    case actionConstants.SET_ACTIVE_EMPLOYEE:
    case actionConstants.LOAD_EMPLOYEE_SUCCESS: {
      const activeEmployee = action.payload;
      return { ...state, activeEmployee };
    }

    case actionConstants.SET_SEARCH_TERMS: {
      const searchTerms = action.payload;
      return { ...state, searchTerms };
    }

    case actionConstants.CLEAR_SEARCH_TERMS: {
      return { ...state, searchTerms: null };
    }

    default: {
      return state;
    }
  }
}

export const selectEmployeesLoaded = (state: State) => state.loaded;
export const selectEmployeesLoading = (state: State) => state.loading;
export const selectEmployeesPaginationInfo = (state: State) => state.paginationInfo;
export const selectEmployeesSearchTerms = (state: State) => state.searchTerms;
export const selectActiveEmployee = (state: State) => state.activeEmployee;

export const {
  selectIds: selectEmployeeIds,
  selectEntities: selectEmployeeEntities,
  selectAll: selectAllEmployees,
  selectTotal: selectEmployeeTotal
} = adapter.getSelectors();
