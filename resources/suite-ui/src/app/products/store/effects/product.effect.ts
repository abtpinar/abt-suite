import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/product.constant';
import * as actionCreators from '../actions/product.action';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { select, Store } from '@ngrx/store';
import { ProductFeatureState } from '../reducers';
import { selectProductsSearchTerms } from '../selectors';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private productsStore$: Store<ProductFeatureState>
  ) {}

  asyncActions = [actionConstants.LOAD_PRODUCTS];

  successActions = [];

  failActions = [];

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_PRODUCTS),
    map((action: actionCreators.LoadProducts) => action.payload),
    withLatestFrom(this.productsStore$.pipe(select(selectProductsSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.productsService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<ProductModel>) =>
              new actionCreators.LoadProductsSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadProductsFail(error)))
        );
    })
  );
}
