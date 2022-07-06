import { Injectable } from '@angular/core';
import { Sandbox } from '../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { CLModel } from './models/cl.model';
import { ServerPaginationInfo } from '../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../common/pagination';
import { CLsService } from './services/cls.service';
import { ServerResponse } from '../common/models/ServerResponse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CLsSandbox extends Sandbox {

  clsLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectCLsLoading)
  );

  cls$: Observable<CLModel[]> = this.store$.pipe(
    select(fromStore.selectAllCLs)
  );

  clsPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectCLsPaginationInfo)
  );

  clSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectCLsSearchTerms)
  );

  clsProcessing$: Observable<boolean> = this.store$.pipe(
    select(fromStore.selectCLsProcessing)
  );

  public activeCls$: Observable<CLModel[]> = this.store$.pipe(
    select(fromStore.selectActiveCls)
  );

  constructor(
    private service: CLsService,
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.CLFeatureState>) {
    super(rootStore$);
  }

  public availableUnits$: Observable<CLModel[]> = this.service.getUnits()
    .pipe(map((res: ServerResponse<CLModel>) => res.response.data));

  loadCLs(paginationInfo: PaginationInfo = {
    page: 1,
    itemsPerPage: DEFAULT_PAGE_SIZE
  }) {
    this.store$.dispatch(new fromStore.LoadCLs(paginationInfo));
  }

  search(terms,
    paginationInfo: PaginationInfo = {
      page: 1,
      itemsPerPage: DEFAULT_PAGE_SIZE
    }) {
    this.store$.dispatch(new fromStore.SetSearchTerms(terms));

    this.loadCLs(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearSearchTerms());
  }

  setActiveCls(cls: CLModel[]) {
    this.store$.dispatch(new fromStore.SetActiveCls(cls));
  }

  processSelectedCLs(clIds) {
    this.store$.dispatch(new fromStore.ProcessSelectedCLs(clIds));
  }

  updateFromSIPAC() {
    this.store$.dispatch(new fromStore.UpdateFromSIPAC());
  }
}
