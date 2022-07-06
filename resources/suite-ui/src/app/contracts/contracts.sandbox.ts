import { Injectable } from '@angular/core';
import { Sandbox } from '../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { ContractModel } from './models/contract.model';
import { ServerPaginationInfo } from '../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../common/pagination';
import {FarmerModel} from '../farmers/models/farmer.model';
import { ClassModel } from '../parameters/cover/models/class.model';
import { ClassesService } from '../parameters/cover/services/classes.service';
import { ServerResponse } from '../common/models/ServerResponse';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products/services/products.service';
import { ProductModel } from '../products/models/product.model';
import {ProductionUnitModel} from "../parameters/general/models/production-unit.model";
import {ProductionUnitsService} from "../parameters/general/services/production-units.service";

@Injectable({
  providedIn: 'root'
})
export class ContractsSandbox extends Sandbox {

  contractsLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectContractsLoading)
  );

  contracts$: Observable<ContractModel[]> = this.store$.pipe(
    select(fromStore.selectAllContracts)
  );

  /**
   * The active farmer selected to assign to the current contract under creation/editing
   */
  public contractFarmer$: Observable<FarmerModel> = this.store$.pipe(
    select(fromStore.selectContractFarmer)
  );

  contractsPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectContractsPaginationInfo)
  );

  contractSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectContractsSearchTerms)
  );

  /**
   * Gets the contract from the activatedRoute or returns null if there
   * is no contract with and id equals to the one in the route
   */
  public activeContract$: Observable<ContractModel> = this.store$.pipe(
    select(fromStore.selectActiveContract)
  );

  constructor(
    private classesService: ClassesService,
    private productsService: ProductsService,
    rootStore$: Store<fromRoot.AppState>,
    private productionUnitsService: ProductionUnitsService,
    private store$: Store<fromStore.ContractFeatureState>) {
    super(rootStore$);
  }

  public availableUnits$: Observable<ProductionUnitModel[]> = this.productionUnitsService.searchItems({page:1, size:500})
      .pipe(map((res: ServerResponse<ProductionUnitModel>) => res.response.data));

  public availableTobaccoTapadoClasses$: Observable<ClassModel[]> = this.classesService.searchItems({page:1, size:500, tobacco_type: 'TP'})
  .pipe(map((res: ServerResponse<ClassModel>) => res.response.data));

  public availableTobaccoBurleyClasses$: Observable<ClassModel[]> = this.classesService.searchItems({page:1, size:500, tobacco_type: 'BY'})
      .pipe(map((res: ServerResponse<ClassModel>) => res.response.data));

  public availableProducts$: Observable<ProductModel[]> = this.productsService.searchItems({page:1, size:500, concept_distinct: 'CB'})
  .pipe(map((res: ServerResponse<ProductModel>) => res.response.data));

  /*public availableProductsSR$: Observable<ProductModel[]> = this.productsService.searchItems({page:1, size:500, concept:'SR'})
  .pipe(map((res: ServerResponse<ProductModel>) => res.response.data));*/

  loadContracts(paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.LoadContracts(paginationInfo));
  }

 search(terms, paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.SetSearchTerms(terms));
    this.loadContracts(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearSearchTerms());
  }

  deleteContract(contract: ContractModel): void {
    this.store$.dispatch(new fromStore.DeleteContract(contract));
  }

  addContract(contract: ContractModel): void {
    this.store$.dispatch(new fromStore.AddContract(contract));
  }

  addContractAndContinue(contract: ContractModel): void {
    this.store$.dispatch(new fromStore.AddContractAndContinue(contract));
  }

  updateContract(contract: ContractModel): any {
    this.store$.dispatch(new fromStore.UpdateContract(contract));
  }

  setActiveContract(contract: ContractModel) {
    this.store$.dispatch(new fromStore.SetActiveContract(contract));
  }

  loadInitialFarmer(farmerId: number | string) {
    this.store$.dispatch(new fromStore.LoadContractFarmer(farmerId));
  }

  setContractFarmer(farmer: FarmerModel) {
    this.store$.dispatch(new fromStore.SetContractFarmer(farmer));
  }

  clearContractFarmer() {
    this.store$.dispatch(new fromStore.ClearContractFarmer());
  }

}
