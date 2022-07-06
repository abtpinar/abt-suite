import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/product.constant';
import * as actionCreators from '../actions/product.action';
import { ProductModel } from '../../models/product.model';
import { ServerPaginationInfo } from '../../../common/models/ServerPaginationInfo';

export interface State extends EntityState<ProductModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
}

export const adapter: EntityAdapter<ProductModel> = createEntityAdapter<ProductModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null
});

export function reducer(
  state = initialState,
  action: actionCreators.productActions
) {
  switch (action.type) {
    case actionConstants.LOAD_PRODUCTS: {
      return { ...state, loading: true };
    }

    case actionConstants.LOAD_PRODUCTS_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_PRODUCTS_SUCCESS: {
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

    default: {
      return state;
    }
  }
}

export const selectProductsLoaded = (state: State) => state.loaded;
export const selectProductsLoading = (state: State) => state.loading;
export const selectProductsPaginationInfo = (state: State) => state.paginationInfo;
export const selectProductsSearchTerms = (state: State) => state.searchTerms;

export const {
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectProductTotal
} = adapter.getSelectors();
