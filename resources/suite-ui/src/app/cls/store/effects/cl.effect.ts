import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/cl.constant';
import * as actionCreators from '../actions/cl.action';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { CLModel } from '../../models/cl.model';
import { CLsService } from '../../services/cls.service';
import { select, Store } from '@ngrx/store';
import { CLFeatureState } from '../reducers';
import { selectCLsPaginationInfo, selectCLsSearchTerms } from '../selectors';
import { NotificationService } from 'src/app/common/services/notification.service';
import { LanguageService } from 'src/app/i18n/services/language.service';

@Injectable()
export class CLEffects {
  constructor(
    private actions$: Actions,
    private clsService: CLsService,
    private clsStore$: Store<CLFeatureState>,
    private notificationService: NotificationService,
    private languageService: LanguageService,
  ) {}

  asyncActions = [actionConstants.LOAD_CLS];

  successActions = [];

  failActions = [];

  @Effect()
  loadCLs$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_CLS),
    map((action: actionCreators.LoadCLs) => action.payload),
    withLatestFrom(this.clsStore$.pipe(select(selectCLsSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.clsService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<CLModel>) =>
              new actionCreators.LoadCLsSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadCLsFail(error)))
        );
    })
  );

  @Effect()
  processSelectedCLs$ = this.actions$.pipe(
    ofType(actionConstants.PROCESS_SELECTED_CLS),
    map((action: actionCreators.ProcessSelectedCLs) => action.payload),
    switchMap(processIds => {
      return this.clsService.processSelectedCLs(processIds).pipe(
        map((res: any) => new actionCreators.ProcessSelectedCLsSuccess(res.response.data)),
        catchError(error => {
          return of(new actionCreators.ProcessSelectedCLsFail(error));
        })
      );
    })
  );

  @Effect()
  reloadAfterAction$ = this.actions$.pipe(
    ofType(actionConstants.UPDATE_FROM_SIPAC_SUCCESS),
    withLatestFrom(this.clsStore$.pipe(select(selectCLsPaginationInfo))),
    map(pi => new actionCreators.LoadCLs({page: pi[1].current_page, itemsPerPage: pi[1].per_page}))
  );

  @Effect()
  updateFromSIPAC$ = this.actions$.pipe(
    ofType(actionConstants.UPDATE_FROM_SIPAC),
    switchMap(response => {
      return this.clsService.updateFromSIPAC().pipe(
        map(res => new actionCreators.UpdateFromSIPACSuccess()),
        catchError(error => {
          return of(new actionCreators.UpdateFromSIPACFail(error));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  notifyUpdateFromSIPACFailed$ = this.actions$.pipe(
    ofType(actionConstants.UPDATE_FROM_SIPAC_FAIL),
    map((action: actionCreators.UpdateFromSIPACFail) => action.payload),
    map(error => this.notificationService.showError(this.languageService.translate('notifications.operations.error')))
  );
  
}
