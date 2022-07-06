import { Injectable } from '@angular/core';
import { Sandbox } from '../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { FarmModel } from './models/farm.model';
import { ServerPaginationInfo } from '../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../common/pagination';
import { ClassesService } from '../parameters/cover/services/classes.service';
import { ServerResponse } from '../common/models/ServerResponse';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products/services/products.service';
import { ProductModel } from '../products/models/product.model';
import {FarmerModel} from '../farmers/models/farmer.model';
import {ProductionUnitModel} from "../parameters/general/models/production-unit.model";
import {ProductionUnitsService} from "../parameters/general/services/production-units.service";

@Injectable({
  providedIn: 'root'
})
export class FarmsSandbox extends Sandbox {

  farmsLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectFarmsLoading)
  );

  farms$: Observable<FarmModel[]> = this.store$.pipe(
    select(fromStore.selectAllFarms)
  );

  /**
   * The active farmer selected to assign to the current contract under creation/editing
   */
  public farmFarmer$: Observable<FarmerModel> = this.store$.pipe(
    select(fromStore.selectFarmFarmer)
  );

  farmsPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectFarmsPaginationInfo)
  );

  contractSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectFarmsSearchTerms)
  );

  /**
   * Gets the contract from the activatedRoute or returns null if there
   * is no contract with and id equals to the one in the route
   */
  public activeFarm$: Observable<FarmModel> = this.store$.pipe(
    select(fromStore.selectActiveFarms)
  );

  constructor(
    private classesService: ClassesService,
    private productsService: ProductsService,
    private productionUnitsService: ProductionUnitsService,
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.FarmFeatureState>) {
    super(rootStore$);
  }

  /*public availableTobaccoClasses$: Observable<ClassModel[]> = this.classesService.searchItems({page:1, size:500})
  .pipe(map((res: ServerResponse<ClassModel>) => res.response.data));


  public availableProducts$: Observable<ProductModel[]> = this.productsService.searchItems({page:1, size:500})
  .pipe(map((res: ServerResponse<ProductModel>) => res.response.data));*/

  public availableUnits$: Observable<ProductionUnitModel[]> = this.productionUnitsService.searchItems({page:1, size:500})
      .pipe(map((res: ServerResponse<ProductionUnitModel>) => res.response.data));

  loadFarms(paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.LoadFarms(paginationInfo));
  }

  search(terms, paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.SetSearchTerms(terms));
    this.loadFarms(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearSearchTerms());
  }

  deleteFarm(farm: FarmModel): void {
    this.store$.dispatch(new fromStore.DeleteFarm(farm));
  }

  addFarm(farm: FarmModel): void {
    this.store$.dispatch(new fromStore.AddFarm(farm));
  }

  updateFarm(farm: FarmModel): any {
    this.store$.dispatch(new fromStore.UpdateFarm(farm));
  }

  setActiveFarm(farm: FarmModel) {
    this.store$.dispatch(new fromStore.SetActiveFarm(farm));
  }

  loadInitialFarmer(farmerId: number | string) {
    this.store$.dispatch(new fromStore.LoadFarmFarmer(farmerId));
  }

  setFarmFarmer(farmer: FarmerModel) {
    this.store$.dispatch(new fromStore.SetFarmFarmer(farmer));
  }

  clearFarmFarmer() {
    this.store$.dispatch(new fromStore.ClearFarmFarmer());
  }

}
