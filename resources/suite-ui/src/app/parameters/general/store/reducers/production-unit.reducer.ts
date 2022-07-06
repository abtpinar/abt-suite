import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/production-unit.constant';
import * as actionCreators from '../actions/production-unit.action';
import { ProductionUnitModel } from '../../models/production-unit.model';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';

export interface State extends EntityState<ProductionUnitModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  activeProductionUnit: ProductionUnitModel;
}

export const adapter: EntityAdapter<ProductionUnitModel> = createEntityAdapter<ProductionUnitModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  activeProductionUnit: null,
});

export function reducer(
  state = initialState,
  action: actionCreators.classActions
) {
  switch (action.type) {
    
    case actionConstants.ADD_PRODUCTION_UNIT:
    case actionConstants.UPDATE_PRODUCTION_UNIT:
    case actionConstants.DELETE_PRODUCTION_UNIT:
    case actionConstants.LOAD_PRODUCTION_UNIT:
    case actionConstants.LOAD_PRODUCTION_UNITS: {
      return { ...state, loading: true };
    }

    case actionConstants.ADD_PRODUCTION_UNIT_FAIL:
    case actionConstants.UPDATE_PRODUCTION_UNIT_FAIL:
    case actionConstants.DELETE_PRODUCTION_UNIT_FAIL:
    case actionConstants.LOAD_PRODUCTION_UNIT_FAIL:
    case actionConstants.LOAD_PRODUCTION_UNITS_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_PRODUCTION_UNITS_SUCCESS: {
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

    case actionConstants.DELETE_PRODUCTION_UNIT_SUCCESS: {
      const deletedItem = action.payload;
      return adapter.removeOne(deletedItem.id, { ...state, loading: false });
    }

    case actionConstants.UPDATE_PRODUCTION_UNIT_SUCCESS: {
      const updatedItem = action.payload;
      return adapter.updateOne(
        {
          id: updatedItem.id,
          changes: { ...updatedItem }
        },
        { ...state, loading: false }
      );
    }

    case actionConstants.SET_ACTIVE_PRODUCTION_UNIT: {
      const activeProductionUnit = action.payload;
      return { ...state, activeProductionUnit };
    }

    case actionConstants.SET_PRODUCTION_UNIT_SEARCH_TERMS: {
      const searchTerms = action.payload;
      return { ...state, searchTerms };
    }

    case actionConstants.CLEAR_PRODUCTION_UNIT_SEARCH_TERMS: {
      return { ...state, searchTerms: null };
    }

    default: {
      return state;
    }
  }
}

export const selectProductionUnitsLoaded = (state: State) => state.loaded;
export const selectProductionUnitsLoading = (state: State) => state.loading;
export const selectProductionUnitsPaginationInfo = (state: State) => state.paginationInfo;
export const selectProductionUnitsSearchTerms = (state: State) => state.searchTerms;
export const selectActiveProductionUnit = (state: State) => state.activeProductionUnit;

export const {
  selectIds: selectProductionUnitIds,
  selectEntities: selectProductionUnitEntities,
  selectAll: selectAllProductionUnits,
  selectTotal: selectProductionUnitTotal
} = adapter.getSelectors();
