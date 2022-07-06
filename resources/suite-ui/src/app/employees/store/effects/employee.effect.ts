import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/employee.constant';
import * as actionCreators from '../actions/employee.action';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { select, Store } from '@ngrx/store';
import { EmployeeFeatureState } from '../reducers';
import { selectEmployeesSearchTerms } from '../selectors';
import { NotificationService } from 'src/app/common/services/notification.service';
import { LanguageService } from 'src/app/i18n/services/language.service';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService,
    private employeesStore$: Store<EmployeeFeatureState>,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private router: Router,
  ) {}  

  private asyncActions = [
    actionConstants.ADD_EMPLOYEE,
    actionConstants.UPDATE_EMPLOYEE,
    actionConstants.DELETE_EMPLOYEE,
    actionConstants.LOAD_EMPLOYEES
  ];
  private successActions = [
    actionConstants.ADD_EMPLOYEE_SUCCESS,
    actionConstants.UPDATE_EMPLOYEE_SUCCESS,
    actionConstants.DELETE_EMPLOYEE_SUCCESS
  ];
  private failActions = [
    actionConstants.ADD_EMPLOYEE_FAIL,
    actionConstants.UPDATE_EMPLOYEE_FAIL,
    actionConstants.DELETE_EMPLOYEE_FAIL
  ];

  @Effect()
  loadEmployees$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_EMPLOYEES),
    map((action: actionCreators.LoadEmployees) => action.payload),
    withLatestFrom(this.employeesStore$.pipe(select(selectEmployeesSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.employeesService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<EmployeeModel>) =>
              new actionCreators.LoadEmployeesSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadEmployeesFail(error)))
        );
    })
  );



  /**
   * This effect reacts to the dispatch of a Delete Product action, and
   * attemps to perform that operation of the backend API.
   */
   @Effect()
   deleteEmployee$ = this.actions$.pipe(
     ofType(actionConstants.DELETE_EMPLOYEE),
     map((action: actionCreators.DeleteEmployee) => action.payload),
     switchMap(employee =>
       this.employeesService.deleteItem(employee).pipe(
         map(() => new actionCreators.DeleteEmployeeSuccess(employee)),
         catchError(error => of(new actionCreators.DeleteEmployee(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of a Add Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   addEmployee$ = this.actions$.pipe(
     ofType(actionConstants.ADD_EMPLOYEE),
     map((action: actionCreators.AddEmployee) => action.payload),
     switchMap(employee =>
       this.employeesService.createItem(employee).pipe(
         map(() => new actionCreators.AddEmployeeSuccess()),
         catchError(error => of(new actionCreators.AddEmployeeFail(error)))
       )
     )
   );
 
   /**
    * This effect reacts to the dispatch of an Update Product action, and
    * attemps to perform that operation of the backend API.
    */
   @Effect()
   updateEmployee$ = this.actions$.pipe(
     ofType(actionConstants.UPDATE_EMPLOYEE),
     map((action: actionCreators.UpdateEmployee) => action.payload),
     switchMap(employee =>
       this.employeesService.updateItem(employee).pipe(
         map(() => new actionCreators.UpdateEmployeeSuccess(employee)),
         catchError(error => of(new actionCreators.UpdateEmployeeFail(error)))
       )
     )
   );
 
   @Effect({ dispatch: false })
   redirectOnSuccess$ = this.actions$.pipe(
     ofType(
       actionConstants.ADD_EMPLOYEE_SUCCESS,
       actionConstants.UPDATE_EMPLOYEE_SUCCESS
     ),
     // TODO: Check why router actions are not workind
     // meanwhile using normal router
     // map(() => new uiActions.Go({ path: ['/clients'] }))
     map(() => this.router.navigateByUrl('/employees'))
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
   loadEmployee$ = this.actions$.pipe(
     ofType(actionConstants.LOAD_EMPLOYEE),
     map((action: actionCreators.LoadEmployee) => action.payload),
     switchMap((employeeId: number) => {
       return this.employeesService
         .getInstance(employeeId)
         .pipe(
           map(
             (response: {status, response}) =>
               new actionCreators.LoadEmployeeSuccess(response.response.data)
           ),
           catchError(error => of(new actionCreators.LoadEmployeeFail(error)))
         );
     })
   );

   private getNotificationMessageByAction(actionType: string) {
     const messageKeysMap = {
       [actionConstants.ADD_EMPLOYEE_SUCCESS]: 'employees.notifications.add-success', 
       [actionConstants.ADD_EMPLOYEE_FAIL]: 'employees.notifications.add-failed', 
       [actionConstants.UPDATE_EMPLOYEE_SUCCESS]: 'employees.notifications.update-success', 
       [actionConstants.UPDATE_EMPLOYEE_FAIL]: 'employees.notifications.update-failed', 
       [actionConstants.DELETE_EMPLOYEE_SUCCESS]: 'employees.notifications.delete-success', 
       [actionConstants.DELETE_EMPLOYEE_FAIL]: 'employees.notifications.delete-failed'
     }; 
     return messageKeysMap[actionType];
   }

}
