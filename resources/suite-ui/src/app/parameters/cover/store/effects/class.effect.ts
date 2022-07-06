import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/class.constant';
import * as actionCreators from '../actions/class.action';
import * as uiActions from '../../../../@rootStore/actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClassModel } from '../../models/class.model';
import { ClassesService } from '../../services/classes.service';
import { select, Store } from '@ngrx/store';
import { CoverFeatureState } from '../reducers';
import { selectClassesSearchTerms } from '../selectors';
import { NotificationService } from 'src/app/common/services/notification.service';
import { LanguageService } from 'src/app/i18n/services/language.service';
import { Router } from '@angular/router';
import { ServerResponse } from 'src/app/common/models/ServerResponse';
import { DEFAULT_PAGE_SIZE } from 'src/app/common/pagination';

@Injectable()
export class ClassEffects {
  constructor(
    private actions$: Actions,
    private classesService: ClassesService,
    private classesStore$: Store<CoverFeatureState>,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private router: Router
  ) {}  

  private asyncActions = [
    actionConstants.ADD_CLASS,
    actionConstants.UPDATE_CLASS,
    actionConstants.DELETE_CLASS,
    actionConstants.LOAD_CLASSES
  ];
  private successActions = [
    actionConstants.ADD_CLASS_SUCCESS,
    actionConstants.UPDATE_CLASS_SUCCESS,
    actionConstants.DELETE_CLASS_SUCCESS
  ];
  private failActions = [
    actionConstants.ADD_CLASS_FAIL,
    actionConstants.UPDATE_CLASS_FAIL,
    actionConstants.DELETE_CLASS_FAIL
  ];

  @Effect()
  loadClasses$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_CLASSES),
    map((action: actionCreators.LoadClasses) => action.payload),
    withLatestFrom(this.classesStore$.pipe(select(selectClassesSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.classesService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<ClassModel>) =>
              new actionCreators.LoadClassesSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadClassesFail(error)))
        );
    })
  );



  /**
   * This effect reacts to the dispatch of a Delete Product action, and
   * attemps to perform that operation of the backend API.
   */
   @Effect()
   deleteClass$ = this.actions$.pipe(
     ofType(actionConstants.DELETE_CLASS),
     map((action: actionCreators.DeleteClass) => action.payload),
     switchMap(tClass =>
       this.classesService.deleteItem(tClass).pipe(
         map(() => new actionCreators.DeleteClassSuccess(tClass)),
         catchError(error => of(new actionCreators.DeleteClass(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of a Add Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   addClass$ = this.actions$.pipe(
     ofType(actionConstants.ADD_CLASS),
     map((action: actionCreators.AddClass) => action.payload),
     switchMap(tClass =>
       this.classesService.createItem(tClass).pipe(
         map(() => new actionCreators.AddClassSuccess()),
         catchError(error => of(new actionCreators.AddClassFail(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of an Update Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   updateClass$ = this.actions$.pipe(
     ofType(actionConstants.UPDATE_CLASS),
     map((action: actionCreators.UpdateClass) => action.payload),
     switchMap(tClass =>
       this.classesService.updateItem(tClass).pipe(
         map(() => new actionCreators.UpdateClassSuccess(tClass)),
         catchError(error => of(new actionCreators.UpdateClassFail(error)))
       )
     )
   );
 
   @Effect()
   closeModalOnSuccess$ = this.actions$.pipe(
     ofType(
       actionConstants.ADD_CLASS_SUCCESS,
       actionConstants.UPDATE_CLASS_SUCCESS
     ),
     map(() => new uiActions.CloseModal())
   );
 
   @Effect()
   reloadOnSuccess$ = this.actions$.pipe(
     ofType(
       actionConstants.ADD_CLASS_SUCCESS,
     ),
     map(() => new actionCreators.LoadClasses({ page: 1, itemsPerPage: DEFAULT_PAGE_SIZE }))
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
   loadClass$ = this.actions$.pipe(
     ofType(actionConstants.LOAD_CLASS),
     map((action: actionCreators.LoadClass) => action.payload),
     switchMap((classId: number) => {
       return this.classesService
         .getInstance(classId)
         .pipe(
           map(
             (response: {status, response}) =>
               new actionCreators.LoadClassSuccess(response.response.data)
           ),
           catchError(error => of(new actionCreators.LoadClassFail(error)))
         );
     })
   );

   private getNotificationMessageByAction(actionType: string) {
     const messageKeysMap = {
       [actionConstants.ADD_CLASS_SUCCESS]: 'classes.notifications.add-success', 
       [actionConstants.ADD_CLASS_FAIL]: 'classes.notifications.add-failed', 
       [actionConstants.UPDATE_CLASS_SUCCESS]: 'classes.notifications.update-success', 
       [actionConstants.UPDATE_CLASS_FAIL]: 'classes.notifications.update-failed', 
       [actionConstants.DELETE_CLASS_SUCCESS]: 'classes.notifications.delete-success', 
       [actionConstants.DELETE_CLASS_FAIL]: 'classes.notifications.delete-failed'
     }; 
     return messageKeysMap[actionType];
   }

}
