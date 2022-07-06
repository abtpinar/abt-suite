import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/mobile.constant';
import * as actionCreators from '../actions/mobile.action';
import { MobileModel } from '../../models/mobile.model';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';

export interface State extends EntityState<MobileModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  activeMobile: MobileModel;
}

export const adapter: EntityAdapter<MobileModel> = createEntityAdapter<MobileModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  activeMobile: null,
});

export function reducer(
  state = initialState,
  action: actionCreators.mobileActions
) {
  switch (action.type) {
    
    case actionConstants.ADD_MOBILE:
    case actionConstants.UPDATE_MOBILE:
    case actionConstants.DELETE_MOBILE:
    case actionConstants.LOAD_MOBILE:
    case actionConstants.LOAD_MOBILES: {
      return { ...state, loading: true };
    }

    case actionConstants.ADD_MOBILE_FAIL:
    case actionConstants.UPDATE_MOBILE_FAIL:
    case actionConstants.DELETE_MOBILE_FAIL:
    case actionConstants.LOAD_MOBILE_FAIL:
    case actionConstants.LOAD_MOBILES_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_MOBILES_SUCCESS: {
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

    case actionConstants.DELETE_MOBILE_SUCCESS: {
      const deletedItem = action.payload;
      return adapter.removeOne(deletedItem.id, { ...state, loading: false });
    }

    case actionConstants.UPDATE_MOBILE_SUCCESS: {
      const updatedItem = action.payload;
      return adapter.updateOne(
        {
          id: updatedItem.id,
          changes: { ...updatedItem }
        },
        { ...state, loading: false }
      );
    }

    case actionConstants.SET_ACTIVE_MOBILE: {
      const activeMobile = action.payload;
      return { ...state, activeMobile };
    }

    case actionConstants.SET_MOBILE_SEARCH_TERMS: {
      const searchTerms = action.payload;
      return { ...state, searchTerms };
    }

    case actionConstants.CLEAR_MOBILE_SEARCH_TERMS: {
      return { ...state, searchTerms: null };
    }

    default: {
      return state;
    }
  }
}

export const selectMobilesLoaded = (state: State) => state.loaded;
export const selectMobilesLoading = (state: State) => state.loading;
export const selectMobilesPaginationInfo = (state: State) => state.paginationInfo;
export const selectMobilesSearchTerms = (state: State) => state.searchTerms;
export const selectActiveMobile = (state: State) => state.activeMobile;

export const {
  selectIds: selectMobileIds,
  selectEntities: selectMobileEntities,
  selectAll: selectAllMobiles,
  selectTotal: selectMobileTotal
} = adapter.getSelectors();
