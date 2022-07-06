import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/sim.constant';
import * as actionCreators from '../actions/sim.action';
import { SimModel } from '../../models/sim.model';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';

export interface State extends EntityState<SimModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  activeSim: SimModel;
}

export const adapter: EntityAdapter<SimModel> = createEntityAdapter<SimModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  activeSim: null,
});

export function reducer(
  state = initialState,
  action: actionCreators.simActions
) {
  switch (action.type) {
    
    case actionConstants.ADD_SIM:
    case actionConstants.UPDATE_SIM:
    case actionConstants.DELETE_SIM:
    case actionConstants.LOAD_SIM:
    case actionConstants.LOAD_SIMS: {
      return { ...state, loading: true };
    }

    case actionConstants.ADD_SIM_FAIL:
    case actionConstants.UPDATE_SIM_FAIL:
    case actionConstants.DELETE_SIM_FAIL:
    case actionConstants.LOAD_SIM_FAIL:
    case actionConstants.LOAD_SIMS_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_SIMS_SUCCESS: {
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

    case actionConstants.DELETE_SIM_SUCCESS: {
      const deletedItem = action.payload;
      return adapter.removeOne(deletedItem.id, { ...state, loading: false });
    }

    case actionConstants.UPDATE_SIM_SUCCESS: {
      const updatedItem = action.payload;
      return adapter.updateOne(
        {
          id: updatedItem.id,
          changes: { ...updatedItem }
        },
        { ...state, loading: false }
      );
    }

    case actionConstants.SET_ACTIVE_SIM: {
      const activeSim = action.payload;
      return { ...state, activeSim };
    }

    case actionConstants.SET_SIM_SEARCH_TERMS: {
      const searchTerms = action.payload;
      return { ...state, searchTerms };
    }

    case actionConstants.CLEAR_SIM_SEARCH_TERMS: {
      return { ...state, searchTerms: null };
    }

    default: {
      return state;
    }
  }
}

export const selectSimsLoaded = (state: State) => state.loaded;
export const selectSimsLoading = (state: State) => state.loading;
export const selectSimsPaginationInfo = (state: State) => state.paginationInfo;
export const selectSimsSearchTerms = (state: State) => state.searchTerms;
export const selectActiveSim = (state: State) => state.activeSim;

export const {
  selectIds: selectSimIds,
  selectEntities: selectSimEntities,
  selectAll: selectAllSims,
  selectTotal: selectSimTotal
} = adapter.getSelectors();
