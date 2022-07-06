import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/cl-payment.constant';
import * as actionCreators from '../actions/cl-payment.action';
import { CLPaymentModel } from '../../models/cl-payment.model';
import { ServerPaginationInfo } from '../../../common/models/ServerPaginationInfo';

export interface State extends EntityState<CLPaymentModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
}

export const adapter: EntityAdapter<CLPaymentModel> = createEntityAdapter<CLPaymentModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null
});

export function reducer(
  state = initialState,
  action: actionCreators.CLPaymentActions
) {
  switch (action.type) {
    case actionConstants.LOAD_CL_PAYMENTS: {
      return { ...state, loading: true };
    }

    case actionConstants.LOAD_CL_PAYMENTS_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_CL_PAYMENTS_SUCCESS: {
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

    case actionConstants.SET_CL_PAYMENTS_SEARCH_TERMS: {
      const searchTerms = action.payload;
      return { ...state, searchTerms };
    }

    case actionConstants.CLEAR_CL_PAYMENTS_SEARCH_TERMS: {
      return { ...state, searchTerms: null };
    }

    default: {
      return state;
    }
  }
}

export const selectCLPaymentsLoaded = (state: State) => state.loaded;
export const selectCLPaymentsLoading = (state: State) => state.loading;
export const selectCLPaymentsPaginationInfo = (state: State) => state.paginationInfo;
export const selectCLPaymentsSearchTerms = (state: State) => state.searchTerms;

export const {
  selectIds: selectCLPaymentIds,
  selectEntities: selectCLPaymentEntities,
  selectAll: selectAllCLPayments,
  selectTotal: selectCLPaymentTotal
} = adapter.getSelectors();
