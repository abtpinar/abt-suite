import { Injectable } from '@angular/core';
import { Sandbox } from '../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { FarmerModel } from './models/farmer.model';
import { ServerPaginationInfo } from '../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../common/pagination';
import { ProductionUnitModel } from '../parameters/general/models/production-unit.model';
import { ProductionUnitsService } from '../parameters/general/services/production-units.service';
import { map } from 'rxjs/operators';
import { ServerResponse } from '../common/models/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class FarmersSandbox extends Sandbox {

  farmersLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectFarmersLoading)
  );

  farmers$: Observable<FarmerModel[]> = this.store$.pipe(
    select(fromStore.selectAllFarmers)
  );

  farmersPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectFarmersPaginationInfo)
  );

  farmerSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectFarmersSearchTerms)
  );

  /**
   * Gets the farmer from the activatedRoute or returns null if there
   * is no farmer with and id equals to the one in the route
   */
  public activeFarmer$: Observable<FarmerModel> = this.store$.pipe(
    select(fromStore.selectActiveFarmer)
  );

  constructor(
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.FarmerFeatureState>,
    private productionUnitsService: ProductionUnitsService
    ) {
    super(rootStore$);
  }
  public availableUnits$: Observable<ProductionUnitModel[]> = this.productionUnitsService.searchItems({page:1, size:500})
  .pipe(map((res: ServerResponse<ProductionUnitModel>) => res.response.data));

  loadFarmers(paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.LoadFarmers(paginationInfo));
  }

  search(terms, paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.SetSearchTerms(terms));
    this.loadFarmers(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearSearchTerms());
  }

  deleteFarmer(farmer: FarmerModel): void {
    this.store$.dispatch(new fromStore.DeleteFarmer(farmer));
  }

  addFarmer(farmer: FarmerModel): void {
    this.store$.dispatch(new fromStore.AddFarmer(farmer));
  }

  updateFarmer(farmer: FarmerModel): any {
    this.store$.dispatch(new fromStore.UpdateFarmer(farmer));
  }

  setActiveFarmer(farmer: FarmerModel) {
    this.store$.dispatch(new fromStore.SetActiveFarmer(farmer));
  }

}
