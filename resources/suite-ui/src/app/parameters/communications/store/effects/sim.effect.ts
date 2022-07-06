import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/sim.constant';
import * as actionCreators from '../actions/sim.action';
import * as uiActions from '../../../../@rootStore/actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { SimModel } from '../../models/sim.model';
import { SimsService } from '../../services/sims.service';
import { select, Store } from '@ngrx/store';
import { CommunicationFeatureState } from '../reducers';
import { selectSimsSearchTerms } from '../selectors';
import { NotificationService } from 'src/app/common/services/notification.service';
import { LanguageService } from 'src/app/i18n/services/language.service';
import { Router } from '@angular/router';
import { ServerResponse } from 'src/app/common/models/ServerResponse';
import { DEFAULT_PAGE_SIZE } from 'src/app/common/pagination';

@Injectable()
export class SimEffects {
  constructor(
    private actions$: Actions,
    private simsService: SimsService,
    private simsStore$: Store<CommunicationFeatureState>,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private router: Router,
  ) {}  

  private asyncActions = [
    actionConstants.ADD_SIM,
    actionConstants.UPDATE_SIM,
    actionConstants.DELETE_SIM,
    actionConstants.LOAD_SIMS
  ];
  private successActions = [
    actionConstants.ADD_SIM_SUCCESS,
    actionConstants.UPDATE_SIM_SUCCESS,
    actionConstants.DELETE_SIM_SUCCESS
  ];
  private failActions = [
    actionConstants.ADD_SIM_FAIL,
    actionConstants.UPDATE_SIM_FAIL,
    actionConstants.DELETE_SIM_FAIL
  ];

  @Effect()
  loadSims$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_SIMS),
    map((action: actionCreators.LoadSims) => action.payload),
    withLatestFrom(this.simsStore$.pipe(select(selectSimsSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.simsService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<SimModel>) =>
              new actionCreators.LoadSimsSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadSimsFail(error)))
        );
    })
  );



  /**
   * This effect reacts to the dispatch of a Delete Product action, and
   * attemps to perform that operation of the backend API.
   */
   @Effect()
   deleteSim$ = this.actions$.pipe(
     ofType(actionConstants.DELETE_SIM),
     map((action: actionCreators.DeleteSim) => action.payload),
     switchMap(sim =>
       this.simsService.deleteItem(sim).pipe(
         map(() => new actionCreators.DeleteSimSuccess(sim)),
         catchError(error => of(new actionCreators.DeleteSim(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of a Add Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   addSim$ = this.actions$.pipe(
     ofType(actionConstants.ADD_SIM),
     map((action: actionCreators.AddSim) => action.payload),
     switchMap(sim =>
       this.simsService.createItem(sim).pipe(
         map(() => new actionCreators.AddSimSuccess()),
         catchError(error => of(new actionCreators.AddSimFail(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of an Update Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   updateSim$ = this.actions$.pipe(
     ofType(actionConstants.UPDATE_SIM),
     map((action: actionCreators.UpdateSim) => action.payload),
     switchMap(sim =>
       this.simsService.updateItem(sim).pipe(
         map(() => new actionCreators.UpdateSimSuccess(sim)),
         catchError(error => of(new actionCreators.UpdateSimFail(error)))
       )
     )
   );
 
   @Effect()
   closeModalOnSuccess$ = this.actions$.pipe(
     ofType(
       actionConstants.ADD_SIM_SUCCESS,
       actionConstants.UPDATE_SIM_SUCCESS
     ),
     map(() => new uiActions.CloseModal())
   );
 
   @Effect()
   reloadOnSuccess$ = this.actions$.pipe(
     ofType(
       actionConstants.ADD_SIM_SUCCESS
     ),
     map(() => new actionCreators.LoadSims({ page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }))
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
   loadSim$ = this.actions$.pipe(
     ofType(actionConstants.LOAD_SIM),
     map((action: actionCreators.LoadSim) => action.payload),
     switchMap((simId: number) => {
       return this.simsService
         .getInstance(simId)
         .pipe(
           map(
             (response: {status, response}) =>
               new actionCreators.LoadSimSuccess(response.response.data)
           ),
           catchError(error => of(new actionCreators.LoadSimFail(error)))
         );
     })
   );

   private getNotificationMessageByAction(actionType: string) {
     const messageKeysMap = {
       [actionConstants.ADD_SIM_SUCCESS]: 'sims.notifications.add-success', 
       [actionConstants.ADD_SIM_FAIL]: 'sims.notifications.add-failed', 
       [actionConstants.UPDATE_SIM_SUCCESS]: 'sims.notifications.update-success', 
       [actionConstants.UPDATE_SIM_FAIL]: 'sims.notifications.update-failed', 
       [actionConstants.DELETE_SIM_SUCCESS]: 'sims.notifications.delete-success', 
       [actionConstants.DELETE_SIM_FAIL]: 'sims.notifications.delete-failed'
     }; 
     return messageKeysMap[actionType];
   }

}
