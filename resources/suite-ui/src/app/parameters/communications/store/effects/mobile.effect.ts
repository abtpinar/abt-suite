import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/mobile.constant';
import * as actionCreators from '../actions/mobile.action';
import * as uiActions from '../../../../@rootStore/actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MobileModel } from '../../models/mobile.model';
import { MobilesService } from '../../services/mobiles.service';
import { select, Store } from '@ngrx/store';
import { CommunicationFeatureState } from '../reducers';
import { selectMobilesSearchTerms } from '../selectors';
import { NotificationService } from 'src/app/common/services/notification.service';
import { LanguageService } from 'src/app/i18n/services/language.service';
import { Router } from '@angular/router';
import { ServerResponse } from 'src/app/common/models/ServerResponse';
import { DEFAULT_PAGE_SIZE } from 'src/app/common/pagination';

@Injectable()
export class MobileEffects {
  constructor(
    private actions$: Actions,
    private mobilesService: MobilesService,
    private mobilesStore$: Store<CommunicationFeatureState>,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private router: Router,
  ) {}  

  private asyncActions = [
    actionConstants.ADD_MOBILE,
    actionConstants.UPDATE_MOBILE,
    actionConstants.DELETE_MOBILE,
    actionConstants.LOAD_MOBILES
  ];
  private successActions = [
    actionConstants.ADD_MOBILE_SUCCESS,
    actionConstants.UPDATE_MOBILE_SUCCESS,
    actionConstants.DELETE_MOBILE_SUCCESS
  ];
  private failActions = [
    actionConstants.ADD_MOBILE_FAIL,
    actionConstants.UPDATE_MOBILE_FAIL,
    actionConstants.DELETE_MOBILE_FAIL
  ];

  @Effect()
  loadMobiles$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_MOBILES),
    map((action: actionCreators.LoadMobiles) => action.payload),
    withLatestFrom(this.mobilesStore$.pipe(select(selectMobilesSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.mobilesService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<MobileModel>) =>
              new actionCreators.LoadMobilesSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadMobilesFail(error)))
        );
    })
  );



  /**
   * This effect reacts to the dispatch of a Delete Product action, and
   * attemps to perform that operation of the backend API.
   */
   @Effect()
   deleteMobile$ = this.actions$.pipe(
     ofType(actionConstants.DELETE_MOBILE),
     map((action: actionCreators.DeleteMobile) => action.payload),
     switchMap(mobile =>
       this.mobilesService.deleteItem(mobile).pipe(
         map(() => new actionCreators.DeleteMobileSuccess(mobile)),
         catchError(error => of(new actionCreators.DeleteMobile(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of a Add Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   addMobile$ = this.actions$.pipe(
     ofType(actionConstants.ADD_MOBILE),
     map((action: actionCreators.AddMobile) => action.payload),
     switchMap(mobile =>
       this.mobilesService.createItem(mobile).pipe(
         map(() => new actionCreators.AddMobileSuccess()),
         catchError(error => of(new actionCreators.AddMobileFail(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of an Update Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   updateMobile$ = this.actions$.pipe(
     ofType(actionConstants.UPDATE_MOBILE),
     map((action: actionCreators.UpdateMobile) => action.payload),
     switchMap(mobile =>
       this.mobilesService.updateItem(mobile).pipe(
         map(() => new actionCreators.UpdateMobileSuccess(mobile)),
         catchError(error => of(new actionCreators.UpdateMobileFail(error)))
       )
     )
   );
 
   @Effect()
   closeModalOnSuccess$ = this.actions$.pipe(
     ofType(
       actionConstants.ADD_MOBILE_SUCCESS,
       actionConstants.UPDATE_MOBILE_SUCCESS
     ),
     map(() => new uiActions.CloseModal())
   );
 
   @Effect()
   reloadOnSuccess$ = this.actions$.pipe(
     ofType(
       actionConstants.ADD_MOBILE_SUCCESS,
       actionConstants.UPDATE_MOBILE_SUCCESS
     ),
     map(() => new actionCreators.LoadMobiles({ page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }))
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
   loadMobile$ = this.actions$.pipe(
     ofType(actionConstants.LOAD_MOBILE),
     map((action: actionCreators.LoadMobile) => action.payload),
     switchMap((mobileId: number) => {
       return this.mobilesService
         .getInstance(mobileId)
         .pipe(
           map(
             (response: {status, response}) =>
               new actionCreators.LoadMobileSuccess(response.response.data)
           ),
           catchError(error => of(new actionCreators.LoadMobileFail(error)))
         );
     })
   );

   private getNotificationMessageByAction(actionType: string) {
     const messageKeysMap = {
       [actionConstants.ADD_MOBILE_SUCCESS]: 'mobiles.notifications.add-success', 
       [actionConstants.ADD_MOBILE_FAIL]: 'mobiles.notifications.add-failed', 
       [actionConstants.UPDATE_MOBILE_SUCCESS]: 'mobiles.notifications.update-success', 
       [actionConstants.UPDATE_MOBILE_FAIL]: 'mobiles.notifications.update-failed', 
       [actionConstants.DELETE_MOBILE_SUCCESS]: 'mobiles.notifications.delete-success', 
       [actionConstants.DELETE_MOBILE_FAIL]: 'mobiles.notifications.delete-failed'
     }; 
     return messageKeysMap[actionType];
   }

}
