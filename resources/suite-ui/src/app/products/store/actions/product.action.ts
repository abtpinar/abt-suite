import { Action } from '@ngrx/store';

import * as constants from '../constants/product.constant';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { ProductModel } from '../../models/product.model';
import { PaginationInfo } from '../../../common/pagination';

export class LoadProducts implements Action {
  readonly type = constants.LOAD_PRODUCTS;
  constructor(public payload: PaginationInfo) {}
}

export class LoadProductsFail implements Action {
  readonly type = constants.LOAD_PRODUCTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductsSuccess implements Action {
  readonly type = constants.LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: ServerResponse<ProductModel>) {}
}

// SEARCH
export class SetSearchTerms implements Action {
  readonly type = constants.SET_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearSearchTerms implements Action {
  readonly type = constants.CLEAR_SEARCH_TERMS;
}

export type productActions =
  | LoadProducts
  | LoadProductsFail
  | LoadProductsSuccess
  | SetSearchTerms
  | ClearSearchTerms;
