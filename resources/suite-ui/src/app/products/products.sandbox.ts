import {Injectable} from '@angular/core';
import {Sandbox} from '../common/base.sandbox';
import {Store, select} from '@ngrx/store';
import * as fromRoot from '../@rootStore';
import * as fromStore from './store';
import {Observable, BehaviorSubject} from 'rxjs';
import {ProductModel} from './models/product.model';
import {ServerPaginationInfo} from '../common/models/ServerPaginationInfo';
import {PaginationInfo, DEFAULT_PAGE_SIZE} from '../common/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductsSandbox extends Sandbox {

  productsLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectProductsLoading)
  );

  products$: Observable<ProductModel[]> = this.store$.pipe(
    select(fromStore.selectAllProducts)
  );

  productsPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectProductsPaginationInfo)
  );

  productSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectProductsSearchTerms)
  );

  constructor(
              rootStore$: Store<fromRoot.AppState>,
              private store$: Store<fromStore.ProductFeatureState>) {
    super(rootStore$);
  }

  loadProducts(paginationInfo: PaginationInfo = {
    page: 1,
    itemsPerPage: DEFAULT_PAGE_SIZE
  }) {
    this.store$.dispatch(new fromStore.LoadProducts(paginationInfo));
  }

  search(terms,
         paginationInfo: PaginationInfo = {
           page: 1,
           itemsPerPage: DEFAULT_PAGE_SIZE
         }) {
    this.store$.dispatch(new fromStore.SetSearchTerms(terms));

      this.loadProducts(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearSearchTerms());
  }
}
