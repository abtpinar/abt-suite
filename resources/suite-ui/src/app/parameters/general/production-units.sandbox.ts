import { Injectable } from '@angular/core';
import { Sandbox } from '../../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductionUnitModel } from './models/production-unit.model';
import { ServerPaginationInfo } from '../../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../../common/pagination';
import { map } from 'rxjs/operators';
import { ServerResponse } from 'src/app/common/models/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductionUnitsSandbox extends Sandbox {

  classesLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectProductionUnitsLoading)
  );

  classes$: Observable<ProductionUnitModel[]> = this.store$.pipe(
    select(fromStore.selectAllProductionUnits)
  );

  classesPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectProductionUnitsPaginationInfo)
  );

  classSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectProductionUnitsSearchTerms)
  );

  /**
   * Gets the farmer from the activatedRoute or returns null if there
   * is no farmer with and id equals to the one in the route
   */
  public activeProductionUnit$: Observable<ProductionUnitModel> = this.store$.pipe(
    select(fromStore.selectActiveProductionUnit)
  );

  constructor(
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.GeneralFeatureState>
    ) {
    super(rootStore$);
  }

  loadProductionUnits(paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.LoadProductionUnits(paginationInfo));
  }

  search(terms, paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.SetProductionUnitSearchTerms(terms));
    this.loadProductionUnits(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearProductionUnitSearchTerms());
  }

  deleteProductionUnit(tProductionUnit: ProductionUnitModel): void {
    this.store$.dispatch(new fromStore.DeleteProductionUnit(tProductionUnit));
  }

  addProductionUnit(tProductionUnit: ProductionUnitModel): void {
    this.store$.dispatch(new fromStore.AddProductionUnit(tProductionUnit));
  }tProductionUnit

  updateProductionUnit(tProductionUnit: ProductionUnitModel): any {
    this.store$.dispatch(new fromStore.UpdateProductionUnit(tProductionUnit));
  }

  setActiveProductionUnit(farmer: ProductionUnitModel) {
    this.store$.dispatch(new fromStore.SetActiveProductionUnit(farmer));
  }

}
