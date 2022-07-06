import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/farmer.constant';
import * as actionCreators from '../actions/farmer.action';
import { FarmerModel } from '../../models/farmer.model';
import { ServerPaginationInfo } from '../../../common/models/ServerPaginationInfo';

export interface State extends EntityState<FarmerModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  activeFarmer: FarmerModel;
}

export const adapter: EntityAdapter<FarmerModel> = createEntityAdapter<FarmerModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  activeFarmer: null
});

export function reducer(
  state = initialState,
  action: actionCreators.farmerActions
) {
  switch (action.type) {
    
    case actionConstants.ADD_FARMER:
    case actionConstants.UPDATE_FARMER:
    case actionConstants.DELETE_FARMER:
    case actionConstants.LOAD_FARMER:
    case actionConstants.LOAD_FARMERS: {
      return { ...state, loading: true };
    }

    case actionConstants.ADD_FARMER_FAIL:
    case actionConstants.UPDATE_FARMER_FAIL:
    case actionConstants.DELETE_FARMER_FAIL:
    case actionConstants.LOAD_FARMER_FAIL:
    case actionConstants.LOAD_FARMERS_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_FARMERS_SUCCESS: {
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

    case actionConstants.DELETE_FARMER_SUCCESS: {
      const deletedItem = action.payload;
      return adapter.removeOne(deletedItem.id, { ...state, loading: false });
    }

    case actionConstants.UPDATE_FARMER_SUCCESS: {
      const updatedItem = action.payload;
      return adapter.updateOne(
        {
          id: updatedItem.id,
          changes: { ...updatedItem }
        },
        { ...state }
      );
    }

    case actionConstants.SET_ACTIVE_FARMER:
    case actionConstants.LOAD_FARMER_SUCCESS: {
      const activeFarmer = action.payload;
      return { ...state, activeFarmer };
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

export const selectFarmersLoaded = (state: State) => state.loaded;
export const selectFarmersLoading = (state: State) => state.loading;
export const selectFarmersPaginationInfo = (state: State) => state.paginationInfo;
export const selectFarmersSearchTerms = (state: State) => state.searchTerms;
export const selectActiveFarmer = (state: State) => state.activeFarmer;

export const {
  selectIds: selectFarmerIds,
  selectEntities: selectFarmerEntities,
  selectAll: selectAllFarmers,
  selectTotal: selectFarmerTotal
} = adapter.getSelectors();
