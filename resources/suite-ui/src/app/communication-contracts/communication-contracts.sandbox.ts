import { Injectable } from '@angular/core';
import { Sandbox } from '../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { CommunicationContractModel } from './models/communication-contract.model';
import { ServerPaginationInfo } from '../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../common/pagination';
import {EmployeeModel} from '../employees/models/employee.model';
import { SimsService } from '../parameters/communications/services/sims.service';
import { MobilesService } from '../parameters/communications/services/mobiles.service';
import { MobileModel } from '../parameters/communications/models/mobile.model';
import { ServerResponse } from '../common/models/ServerResponse';
import { map } from 'rxjs/operators';
import { SimModel } from '../parameters/communications/models/sim.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationContractsSandbox extends Sandbox {

  contractsLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectCommunicationContractsLoading)
  );

  contracts$: Observable<CommunicationContractModel[]> = this.store$.pipe(
    select(fromStore.selectAllCommunicationContracts)
  );

  /**
   * The active employee selected to assign to the current contract under creation/editing
   */
  public contractEmployee$: Observable<EmployeeModel> = this.store$.pipe(
    select(fromStore.selectCommunicationContractEmployee)
  );

  contractsPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectCommunicationContractsPaginationInfo)
  );

  contractSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectCommunicationContractsSearchTerms)
  );

  /**
   * Gets the contract from the activatedRoute or returns null if there
   * is no contract with and id equals to the one in the route
   */
  public activeCommunicationContract$: Observable<CommunicationContractModel> = this.store$.pipe(
    select(fromStore.selectActiveCommunicationContract)
  );

  constructor(
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.CommunicationContractFeatureState>,
    private simsService: SimsService,
    private mobilesService: MobilesService
  ) {
    super(rootStore$);
  }

  public availableMobiles$: Observable<MobileModel[]> = this.mobilesService.searchItems({page:1, size:500})
   .pipe(map((res: ServerResponse<MobileModel>) => res.response.data));

  public availableSims$: Observable<SimModel[]> = this.simsService.searchItems({page:1, size:500})
   .pipe(map((res: ServerResponse<SimModel>) => res.response.data));

  loadCommunicationContracts(paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.LoadCommunicationContracts(paginationInfo));
  }

  search(terms, paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.SetSearchTerms(terms));
    this.loadCommunicationContracts(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearSearchTerms());
  }

  deleteCommunicationContract(contract: CommunicationContractModel): void {
    this.store$.dispatch(new fromStore.DeleteCommunicationContract(contract));
  }

  addCommunicationContract(contract: CommunicationContractModel): void {
    this.store$.dispatch(new fromStore.AddCommunicationContract(contract));
  }

  updateCommunicationContract(contract: CommunicationContractModel): any {
    this.store$.dispatch(new fromStore.UpdateCommunicationContract(contract));
  }

  setActiveCommunicationContract(contract: CommunicationContractModel) {
    this.store$.dispatch(new fromStore.SetActiveCommunicationContract(contract));
  }

  loadInitialEmployee(employeeId: number | string) {
    this.store$.dispatch(new fromStore.LoadCommunicationContractEmployee(employeeId));
  }

  setCommunicationContractEmployee(employee: EmployeeModel) {
    this.store$.dispatch(new fromStore.SetCommunicationContractEmployee(employee));
  }

  clearCommunicationContractEmployee() {
    this.store$.dispatch(new fromStore.ClearCommunicationContractEmployee());
  }

}
