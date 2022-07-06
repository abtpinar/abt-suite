import { Injectable } from '@angular/core';
import { Sandbox } from '../../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { SimModel } from './models/sim.model';
import { ServerPaginationInfo } from '../../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../../common/pagination';

@Injectable({
  providedIn: 'root'
})
export class SimsSandbox extends Sandbox {

  simsLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectSimsLoading)
  );

  sims$: Observable<SimModel[]> = this.store$.pipe(
    select(fromStore.selectAllSims)
  );

  simsPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectSimsPaginationInfo)
  );

  simSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectSimsSearchTerms)
  );

  /**
   * Gets the farmer from the activatedRoute or returns null if there
   * is no farmer with and id equals to the one in the route
   */
  public activeSim$: Observable<SimModel> = this.store$.pipe(
    select(fromStore.selectActiveSim)
  );

  constructor(
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.CommunicationFeatureState>) {
    super(rootStore$);
  }

  loadSims(paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.LoadSims(paginationInfo));
  }

  search(terms, paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.SetSimSearchTerms(terms));
    this.loadSims(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearSimSearchTerms());
  }

  deleteSim(sim: SimModel): void {
    this.store$.dispatch(new fromStore.DeleteSim(sim));
  }

  addSim(sim: SimModel): void {
    this.store$.dispatch(new fromStore.AddSim(sim));
  }

  updateSim(sim: SimModel): any {
    this.store$.dispatch(new fromStore.UpdateSim(sim));
  }

  setActiveSim(sim: SimModel) {
    this.store$.dispatch(new fromStore.SetActiveSim(sim));
  }

}
