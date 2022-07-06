import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProduct from '../reducers/product.reducer';

export const getProducts = createSelector(
  fromFeature.selectProductsFeatureState,
  (state: fromFeature.ProductFeatureState) => state.products
);

export const selectProductsEntities = createSelector(
  getProducts,
  fromProduct.selectProductEntities
);

export const selectProductsIds = createSelector(
  getProducts,
  fromProduct.selectProductIds
);

export const selectAllProducts = createSelector(
  getProducts,
  fromProduct.selectAllProducts
);

export const selectProductsTotal = createSelector(
  getProducts,
  fromProduct.selectProductTotal
);

export const selectProductsLoaded = createSelector(
  getProducts,
  fromProduct.selectProductsLoaded
);

export const selectProductsLoading = createSelector(
  getProducts,
  fromProduct.selectProductsLoading
);

export const selectProductsPaginationInfo = createSelector(
  getProducts,
  fromProduct.selectProductsPaginationInfo
);

export const selectProductsSearchTerms = createSelector(
  getProducts,
  fromProduct.selectProductsSearchTerms
);
