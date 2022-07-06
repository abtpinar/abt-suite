import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as actionConstants from '../constants/farmer.constant';
import * as actionCreators from '../actions/farmer.action';
import {switchMap, map, catchError, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {ServerResponse} from '../../../common/models/ServerResponse';
import {FarmerModel} from '../../models/farmer.model';
import {FarmersService} from '../../services/farmers.service';
import {select, Store} from '@ngrx/store';
import {FarmerFeatureState} from '../reducers';
import {selectFarmersSearchTerms} from '../selectors';
import {NotificationService} from 'src/app/common/services/notification.service';
import {LanguageService} from 'src/app/i18n/services/language.service';
import {Router} from '@angular/router';

@Injectable()
export class FarmerEffects {
  constructor(
    private actions$: Actions,
    private farmersService: FarmersService,
    private farmersStore$: Store<FarmerFeatureState>,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private router: Router,
  ) {
  }

  private asyncActions = [
    actionConstants.ADD_FARMER,
    actionConstants.UPDATE_FARMER,
    actionConstants.DELETE_FARMER,
    actionConstants.LOAD_FARMERS
  ];
  private successActions = [
    actionConstants.ADD_FARMER_SUCCESS,
    actionConstants.UPDATE_FARMER_SUCCESS,
    actionConstants.DELETE_FARMER_SUCCESS
  ];
  private failActions = [
    actionConstants.ADD_FARMER_FAIL,
    actionConstants.UPDATE_FARMER_FAIL,
    actionConstants.DELETE_FARMER_FAIL
  ];

  @Effect()
  loadFarmers$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_FARMERS),
    map((action: actionCreators.LoadFarmers) => action.payload),
    withLatestFrom(this.farmersStore$.pipe(select(selectFarmersSearchTerms))),
    switchMap(([{page, itemsPerPage}, terms = {}]) => {
      return this.farmersService
        .searchItems({page, size: itemsPerPage, ...terms})
        .pipe(
          map(
            (res: ServerResponse<FarmerModel>) =>
              new actionCreators.LoadFarmersSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadFarmersFail(error)))
        );
    })
  );


  /**
   * This effect reacts to the dispatch of a Delete Product action, and
   * attemps to perform that operation of the backend API.
   */
  @Effect()
  deleteFarmer$ = this.actions$.pipe(
    ofType(actionConstants.DELETE_FARMER),
    map((action: actionCreators.DeleteFarmer) => action.payload),
    switchMap(farmer =>
      this.farmersService.deleteItem(farmer).pipe(
        map(() => new actionCreators.DeleteFarmerSuccess(farmer)),
        catchError(error => of(new actionCreators.DeleteFarmer(error)))
      )
    )
  );
  /**
   * This effect reacts to the dispatch of a Add Product action, and
   * attemps to perform that operation of the backend API.
   */
  @Effect()
  addFarmer$ = this.actions$.pipe(
    ofType(actionConstants.ADD_FARMER),
    map((action: actionCreators.AddFarmer) => action.payload),
    switchMap(farmer =>
      this.farmersService.createItem(farmer).pipe(
        map(() => new actionCreators.AddFarmerSuccess()),
        catchError(error => of(new actionCreators.AddFarmerFail(error)))
      )
    )
  );
  /**
   * This effect reacts to the dispatch of an Update Product action, and
   * attemps to perform that operation of the backend API.
   */
  @Effect()
  updateFarmer$ = this.actions$.pipe(
    ofType(actionConstants.UPDATE_FARMER),
    map((action: actionCreators.UpdateFarmer) => action.payload),
    switchMap(farmer =>
      this.farmersService.updateItem(farmer).pipe(
        map(() => new actionCreators.UpdateFarmerSuccess(farmer)),
        catchError(error => of(new actionCreators.UpdateFarmerFail(error)))
      )
    )
  );

  @Effect({dispatch: false})
  redirectOnSuccess$ = this.actions$.pipe(
    ofType(
      actionConstants.ADD_FARMER_SUCCESS,
      actionConstants.UPDATE_FARMER_SUCCESS
    ),
    // TODO: Check why router actions are not workind
    // meanwhile using normal router
    // map(() => new uiActions.Go({ path: ['/clients'] }))
    map(() => this.router.navigateByUrl('/farmers'))
  );

  // NOTIFY SUCCESS
  @Effect({dispatch: false})
  notifySuccess$ = this.actions$.pipe(
    ofType(...this.successActions),
    map(action => {
      const messageKey = this.getNotificationMessageByAction(action.type);
      this.notificationService.showSuccess(
        this.languageService.translate(messageKey)
      );
    })
  );

  // NOTIFY ERROR
  @Effect({dispatch: false})
  notifyError$ = this.actions$.pipe(
    ofType(...this.failActions),
    map(action => {
      const messageKey = this.getNotificationMessageByAction(action.type);
      this.notificationService.showError(
        this.languageService.translate(messageKey)
      );
    })
  );

  @Effect()
  loadFarmer$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_FARMER),
    map((action: actionCreators.LoadFarmer) => action.payload),
    switchMap((farmerId: number) => {
      return this.farmersService
        .getInstance(farmerId)
        .pipe(
          map(
            (response: { status, response }) =>
              new actionCreators.LoadFarmerSuccess(response.response.data)
          ),
          catchError(error => of(new actionCreators.LoadFarmerFail(error)))
        );
    })
  );

  private getNotificationMessageByAction(actionType: string) {
    const messageKeysMap = {
      [actionConstants.ADD_FARMER_SUCCESS]: 'farmers.notifications.add-success',
      [actionConstants.ADD_FARMER_FAIL]: 'farmers.notifications.add-failed',
      [actionConstants.UPDATE_FARMER_SUCCESS]: 'farmers.notifications.update-success',
      [actionConstants.UPDATE_FARMER_FAIL]: 'farmers.notifications.update-failed',
      [actionConstants.DELETE_FARMER_SUCCESS]: 'farmers.notifications.delete-success',
      [actionConstants.DELETE_FARMER_FAIL]: 'farmers.notifications.delete-failed'
    };
    return messageKeysMap[actionType];
  }

}
