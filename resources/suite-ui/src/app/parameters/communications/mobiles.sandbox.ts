import { Injectable } from '@angular/core';
import { Sandbox } from '../../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { MobileModel } from './models/mobile.model';
import { ServerPaginationInfo } from '../../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../../common/pagination';
import { MobileBrandsService } from './services/mobile-brands.service';
import { MobileModelsService } from './services/mobile-models.service';
import { map } from 'rxjs/operators';
import { ServerResponse } from 'src/app/common/models/ServerResponse';
import { MobileBrandModel } from './models/mobile-brand.model';
import { MobileModelModel } from './models/mobile-model.model';

@Injectable({
  providedIn: 'root'
})
export class MobilesSandbox extends Sandbox {

  mobilesLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectMobilesLoading)
  );

  mobiles$: Observable<MobileModel[]> = this.store$.pipe(
    select(fromStore.selectAllMobiles)
  );

  mobilesPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectMobilesPaginationInfo)
  );

  mobileSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectMobilesSearchTerms)
  );

  /**
   * Gets the farmer from the activatedRoute or returns null if there
   * is no farmer with and id equals to the one in the route
   */
  public activeMobile$: Observable<MobileModel> = this.store$.pipe(
    select(fromStore.selectActiveMobile)
  );

  constructor(
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.CommunicationFeatureState>,
    private mobileBrandsService: MobileBrandsService,
    private mobileModelsService: MobileModelsService
    ) {
    super(rootStore$);
  }
  
  public availableBrands$: Observable<MobileBrandModel[]> = this.mobileBrandsService.searchItems({page:1, size:500})
  .pipe(map((res: ServerResponse<MobileBrandModel>) => res.response.data));
  
  public availableModels$: Observable<MobileModelModel[]> = this.mobileModelsService.searchItems({page:1, size:500})
  .pipe(map((res: ServerResponse<MobileModelModel>) => res.response.data));

  loadMobiles(paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.LoadMobiles(paginationInfo));
  }

  search(terms, paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.SetMobileSearchTerms(terms));
    this.loadMobiles(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearMobileSearchTerms());
  }

  deleteMobile(mobile: MobileModel): void {
    this.store$.dispatch(new fromStore.DeleteMobile(mobile));
  }

  addMobile(mobile: MobileModel): void {
    this.store$.dispatch(new fromStore.AddMobile(mobile));
  }

  updateMobile(mobile: MobileModel): any {
    this.store$.dispatch(new fromStore.UpdateMobile(mobile));
  }

  setActiveMobile(mobile: MobileModel) {
    this.store$.dispatch(new fromStore.SetActiveMobile(mobile));
  }

}
