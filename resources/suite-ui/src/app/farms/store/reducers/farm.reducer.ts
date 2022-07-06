import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/farm.constant';
import * as actionCreators from '../actions/farm.action';
import { FarmModel } from '../../models/farm.model';
import { ServerPaginationInfo } from '../../../common/models/ServerPaginationInfo';
import {FarmerModel} from '../../../farmers/models/farmer.model';

export interface State extends EntityState<FarmModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  activeFarm: FarmModel;
  farmFarmer: FarmerModel;
}

export const adapter: EntityAdapter<FarmModel> = createEntityAdapter<FarmModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  activeFarm: null,
  farmFarmer: null
});

export function reducer(
  state = initialState,
  action: actionCreators.farmActions
) {
  switch (action.type) {

    case actionConstants.ADD_FARM:
    case actionConstants.UPDATE_FARM:
    case actionConstants.DELETE_FARM:
    case actionConstants.LOAD_FARM:
    case actionConstants.LOAD_FARMS: {
      return { ...state, loading: true };
    }

    case actionConstants.ADD_FARM_FAIL:
    case actionConstants.UPDATE_FARM_FAIL:
    case actionConstants.DELETE_FARM_FAIL:
    case actionConstants.LOAD_FARM_FAIL:
    case actionConstants.LOAD_FARMS_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_FARMS_SUCCESS: {
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

    case actionConstants.DELETE_FARM_SUCCESS: {
      const deletedItem = action.payload;
      return adapter.removeOne(deletedItem.id, { ...state, loading: false });
    }

    case actionConstants.UPDATE_FARM_SUCCESS: {
      const updatedItem = action.payload;
      return adapter.updateOne(
        {
          id: updatedItem.id,
          changes: { ...updatedItem }
        },
        { ...state }
      );
    }

    case actionConstants.SET_ACTIVE_FARM:
    case actionConstants.LOAD_FARM_SUCCESS: {
      const activeFarm = action.payload;
      return { ...state, activeFarm};
    }

    case actionConstants.SET_FARM_FARMER: {
      const farmFarmer = action.payload;
      return { ...state, farmFarmer };
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
export const selectFarmsLoaded = (state: State) => state.loaded;
export const selectFarmsLoading = (state: State) => state.loading;
export const selectFarmsPaginationInfo = (state: State) => state.paginationInfo;
export const selectFarmsSearchTerms = (state: State) => state.searchTerms;
export const selectActiveFarm = (state: State) => state.activeFarm;

export const selectFarmFarmer = (state: State) => state.farmFarmer;

export const {
  selectIds: selectFarmIds,
  selectEntities: selectFarmEntities,
  selectAll: selectAllFarms,
  selectTotal: selectFarmTotal
} = adapter.getSelectors();
