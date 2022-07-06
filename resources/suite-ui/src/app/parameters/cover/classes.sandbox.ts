import { Injectable } from '@angular/core';
import { Sandbox } from '../../common/base.sandbox';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../@rootStore';
import * as fromStore from './store';
import { Observable, BehaviorSubject } from 'rxjs';
import { ClassModel } from './models/class.model';
import { ServerPaginationInfo } from '../../common/models/ServerPaginationInfo';
import { PaginationInfo, DEFAULT_PAGE_SIZE } from '../../common/pagination';
import { map } from 'rxjs/operators';
import { ServerResponse } from 'src/app/common/models/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class ClassesSandbox extends Sandbox {

  classesLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromStore.selectClassesLoading)
  );

  classes$: Observable<ClassModel[]> = this.store$.pipe(
    select(fromStore.selectAllClasses)
  );

  classesPaginationInfo$: Observable<ServerPaginationInfo> = this.rootStore$.pipe(
    select(fromStore.selectClassesPaginationInfo)
  );

  classSearchTerms$: Observable<any> = this.store$.pipe(
    select(fromStore.selectClassesSearchTerms)
  );

  /**
   * Gets the farmer from the activatedRoute or returns null if there
   * is no farmer with and id equals to the one in the route
   */
  public activeClass$: Observable<ClassModel> = this.store$.pipe(
    select(fromStore.selectActiveClass)
  );

  constructor(
    rootStore$: Store<fromRoot.AppState>,
    private store$: Store<fromStore.CoverFeatureState>
    ) {
    super(rootStore$);
  }

  loadClasses(paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.LoadClasses(paginationInfo));
  }

  search(terms, paginationInfo: PaginationInfo = { page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }) {
    this.store$.dispatch(new fromStore.SetClassSearchTerms(terms));
    this.loadClasses(paginationInfo);
  }

  clearSearchTerms() {
    this.store$.dispatch(new fromStore.ClearClassSearchTerms());
  }

  deleteClass(tClass: ClassModel): void {
    this.store$.dispatch(new fromStore.DeleteClass(tClass));
  }

  addClass(tClass: ClassModel): void {
    this.store$.dispatch(new fromStore.AddClass(tClass));
  }tClass

  updateClass(tClass: ClassModel): any {
    this.store$.dispatch(new fromStore.UpdateClass(tClass));
  }

  setActiveClass(farmer: ClassModel) {
    this.store$.dispatch(new fromStore.SetActiveClass(farmer));
  }

}
