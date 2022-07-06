import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/production-unit.constant';
import * as actionCreators from '../actions/production-unit.action';
import * as uiActions from '../../../../@rootStore/actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductionUnitModel } from '../../models/production-unit.model';
import { ProductionUnitsService } from '../../services/production-units.service';
import { select, Store } from '@ngrx/store';
import { GeneralFeatureState } from '../reducers';
import { selectProductionUnitsSearchTerms } from '../selectors';
import { NotificationService } from 'src/app/common/services/notification.service';
import { LanguageService } from 'src/app/i18n/services/language.service';
import { Router } from '@angular/router';
import { ServerResponse } from 'src/app/common/models/ServerResponse';
import { DEFAULT_PAGE_SIZE } from 'src/app/common/pagination';

@Injectable()
export class ProductionUnitEffects {
  constructor(
    private actions$: Actions,
    private productionUnitsService: ProductionUnitsService,
    private productionUnitsStore$: Store<GeneralFeatureState>,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private router: Router
  ) {}  

  private asyncActions = [
    actionConstants.ADD_PRODUCTION_UNIT,
    actionConstants.UPDATE_PRODUCTION_UNIT,
    actionConstants.DELETE_PRODUCTION_UNIT,
    actionConstants.LOAD_PRODUCTION_UNITS
  ];
  private successActions = [
    actionConstants.ADD_PRODUCTION_UNIT_SUCCESS,
    actionConstants.UPDATE_PRODUCTION_UNIT_SUCCESS,
    actionConstants.DELETE_PRODUCTION_UNIT_SUCCESS
  ];
  private failActions = [
    actionConstants.ADD_PRODUCTION_UNIT_FAIL,
    actionConstants.UPDATE_PRODUCTION_UNIT_FAIL,
    actionConstants.DELETE_PRODUCTION_UNIT_FAIL
  ];

  @Effect()
  loadProductionUnits$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_PRODUCTION_UNITS),
    map((action: actionCreators.LoadProductionUnits) => action.payload),
    withLatestFrom(this.productionUnitsStore$.pipe(select(selectProductionUnitsSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.productionUnitsService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<ProductionUnitModel>) =>
              new actionCreators.LoadProductionUnitsSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadProductionUnitsFail(error)))
        );
    })
  );



  /**
   * This effect reacts to the dispatch of a Delete Product action, and
   * attemps to perform that operation of the backend API.
   */
   @Effect()
   deleteProductionUnit$ = this.actions$.pipe(
     ofType(actionConstants.DELETE_PRODUCTION_UNIT),
     map((action: actionCreators.DeleteProductionUnit) => action.payload),
     switchMap(tProductionUnit =>
       this.productionUnitsService.deleteItem(tProductionUnit).pipe(
         map(() => new actionCreators.DeleteProductionUnitSuccess(tProductionUnit)),
         catchError(error => of(new actionCreators.DeleteProductionUnit(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of a Add Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   addProductionUnit$ = this.actions$.pipe(
     ofType(actionConstants.ADD_PRODUCTION_UNIT),
     map((action: actionCreators.AddProductionUnit) => action.payload),
     switchMap(tProductionUnit =>
       this.productionUnitsService.createItem(tProductionUnit).pipe(
         map(() => new actionCreators.AddProductionUnitSuccess()),
         catchError(error => of(new actionCreators.AddProductionUnitFail(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of an Update Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   updateProductionUnit$ = this.actions$.pipe(
     ofType(actionConstants.UPDATE_PRODUCTION_UNIT),
     map((action: actionCreators.UpdateProductionUnit) => action.payload),
     switchMap(tProductionUnit =>
       this.productionUnitsService.updateItem(tProductionUnit).pipe(
         map(() => new actionCreators.UpdateProductionUnitSuccess(tProductionUnit)),
         catchError(error => of(new actionCreators.UpdateProductionUnitFail(error)))
       )
     )
   );
 
   @Effect()
   closeModalOnSuccess$ = this.actions$.pipe(
     ofType(
       actionConstants.ADD_PRODUCTION_UNIT_SUCCESS,
       actionConstants.UPDATE_PRODUCTION_UNIT_SUCCESS
     ),
     map(() => new uiActions.CloseModal())
   );
 
   @Effect()
   reloadOnSuccess$ = this.actions$.pipe(
     ofType(
       actionConstants.ADD_PRODUCTION_UNIT_SUCCESS,
     ),
     map(() => new actionCreators.LoadProductionUnits({ page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }))
   );
 
   // NOTIFY SUCCESS
   @Effect({ dispatch: false })
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
   @Effect({ dispatch: false })
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
   loadProductionUnit$ = this.actions$.pipe(
     ofType(actionConstants.LOAD_PRODUCTION_UNIT),
     map((action: actionCreators.LoadProductionUnit) => action.payload),
     switchMap((classId: number) => {
       return this.productionUnitsService
         .getInstance(classId)
         .pipe(
           map(
             (response: {status, response}) =>
               new actionCreators.LoadProductionUnitSuccess(response.response.data)
           ),
           catchError(error => of(new actionCreators.LoadProductionUnitFail(error)))
         );
     })
   );

   private getNotificationMessageByAction(actionType: string) {
     const messageKeysMap = {
       [actionConstants.ADD_PRODUCTION_UNIT_SUCCESS]: 'production-units.notifications.add-success', 
       [actionConstants.ADD_PRODUCTION_UNIT_FAIL]: 'production-units.notifications.add-failed', 
       [actionConstants.UPDATE_PRODUCTION_UNIT_SUCCESS]: 'production-units.notifications.update-success', 
       [actionConstants.UPDATE_PRODUCTION_UNIT_FAIL]: 'production-units.notifications.update-failed', 
       [actionConstants.DELETE_PRODUCTION_UNIT_SUCCESS]: 'production-units.notifications.delete-success', 
       [actionConstants.DELETE_PRODUCTION_UNIT_FAIL]: 'production-units.notifications.delete-failed'
     }; 
     return messageKeysMap[actionType];
   }

}
