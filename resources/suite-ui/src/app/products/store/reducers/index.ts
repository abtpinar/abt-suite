import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromProduct from './product.reducer';

export interface ProductFeatureState {
  products: fromProduct.State;
}

export const reducers: ActionReducerMap<ProductFeatureState> = {
  products: fromProduct.reducer
};

export const selectProductsFeatureState = createFeatureSelector<
  ProductFeatureState
>('productsFeatureState');
