import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/cl.constant';
import * as actionCreators from '../actions/cl.action';
import { CLModel } from '../../models/cl.model';
import { ServerPaginationInfo } from '../../../common/models/ServerPaginationInfo';

export interface State extends EntityState<CLModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  processing: boolean;
  activeCls: CLModel[];
}

export const adapter: EntityAdapter<CLModel> = createEntityAdapter<CLModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  processing: false,
  activeCls: null,
});

export function reducer(
  state = initialState,
  action: actionCreators.clActions
) {
  switch (action.type) {
    
    case actionConstants.UPDATE_FROM_SIPAC:
    case actionConstants.LOAD_CLS: {
      return { ...state, loading: true };
    }

    case actionConstants.UPDATE_FROM_SIPAC_SUCCESS: {
      return { ...state, loading: false };
    }

    case actionConstants.UPDATE_FROM_SIPAC_FAIL:
    case actionConstants.LOAD_CLS_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_CLS_SUCCESS: {
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

    case actionConstants.SET_SEARCH_TERMS: {
      const searchTerms = action.payload;
      return { ...state, searchTerms };
    }

    case actionConstants.CLEAR_SEARCH_TERMS: {
      return { ...state, searchTerms: null };
    }


    case actionConstants.PROCESS_SELECTED_CLS: {
      return { ...state, processing: true, loading: true };
    }

    case actionConstants.PROCESS_SELECTED_CLS_SUCCESS: {
      const downloadIds = action.payload;
      const entities = { ...state.entities };
      downloadIds.forEach(id => (entities[id].status = 'IN_PROGRESS'));
      return { ...state, entities, processing: false, loading: false };
    }

    case actionConstants.PROCESS_SELECTED_CLS_FAIL: {
      return { ...state, processing: false, loading: false };
    }

    case actionConstants.SET_ACTIVE_CLS: {
      const activeCls = action.payload;
      return { ...state, activeCls };
    }

    default: {
      return state;
    }
  }
}

export const selectCLsLoaded = (state: State) => state.loaded;
export const selectCLsLoading = (state: State) => state.loading;
export const selectCLsPaginationInfo = (state: State) => state.paginationInfo;
export const selectCLsSearchTerms = (state: State) => state.searchTerms;

export const selectCLsProcessing = (state: State) => state.processing;
export const selectActiveCls = (state: State) => state.activeCls;

export const {
  selectIds: selectCLIds,
  selectEntities: selectCLEntities,
  selectAll: selectAllCLs,
  selectTotal: selectCLTotal
} = adapter.getSelectors();
