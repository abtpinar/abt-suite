import { Injectable } from '@angular/core';
import { Sandbox } from '../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { CLPaymentModel } from './models/cl-payment.model';
import { ServerPaginationInfo } from '../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../common/pagination';

@Injectable({
  providedIn: 'root'
})
export class CLPaymentsSandbox extends Sandbox {

  clsLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectCLPaymentsLoading)
  );

  cls$: Observable<CLPaymentModel[]> = this.store$.pipe(
    select(fromStore.selectAllCLPayments)
  );

  clsPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectCLPaymentsPaginationInfo)
  );

  clSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectCLPaymentsSearchTerms)
  );

  constructor(
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.CLFeatureState>) {
    super(rootStore$);
  }

  loadCLPayments(paginationInfo: PaginationInfo = {
    page: 1,
    itemsPerPage: DEFAULT_PAGE_SIZE
  }) {
    this.store$.dispatch(new fromStore.LoadCLPayments(paginationInfo));
  }

  search(terms,
    paginationInfo: PaginationInfo = {
      page: 1,
      itemsPerPage: DEFAULT_PAGE_SIZE
    }) {
    this.store$.dispatch(new fromStore.SetCLPaymentsSearchTerms(terms));

    this.loadCLPayments(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearCLPaymentsSearchTerms());
  }
}
