import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/communication-contract.constant';
import * as actionCreators from '../actions/communication-contract.action';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { CommunicationContractModel } from '../../models/communication-contract.model';
import { CommunicationContractsService } from '../../services/communication-contracts.service';
import { select, Store } from '@ngrx/store';
import { CommunicationContractFeatureState } from '../reducers';
import { selectCommunicationContractsSearchTerms } from '../selectors';
import { NotificationService } from 'src/app/common/services/notification.service';
import { LanguageService } from 'src/app/i18n/services/language.service';
import { Router } from '@angular/router';
import {EmployeesService} from '../../../employees/services/employees.service';

@Injectable()
export class CommunicationContractEffects {
  constructor(
    private actions$: Actions,
    private contractsService: CommunicationContractsService,
    private contractsStore$: Store<CommunicationContractFeatureState>,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private router: Router,
    private employeesService: EmployeesService,
  ) {}

  private asyncActions = [
    actionConstants.ADD_COMMUNICATION_CONTRACT,
    actionConstants.UPDATE_COMMUNICATION_CONTRACT,
    actionConstants.DELETE_COMMUNICATION_CONTRACT,
    actionConstants.LOAD_COMMUNICATION_CONTRACTS
  ];
  private successActions = [
    actionConstants.ADD_COMMUNICATION_CONTRACT_SUCCESS,
    actionConstants.UPDATE_COMMUNICATION_CONTRACT_SUCCESS,
    actionConstants.DELETE_COMMUNICATION_CONTRACT_SUCCESS
  ];
  private failActions = [
    actionConstants.ADD_COMMUNICATION_CONTRACT_FAIL,
    actionConstants.UPDATE_COMMUNICATION_CONTRACT_FAIL,
    actionConstants.DELETE_COMMUNICATION_CONTRACT_FAIL
  ];

  /**
   * Loads the client that will be assigned to the offer
   */
  @Effect()
  loadOfferClient$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_COMMUNICATION_CONTRACT_FARMER),
    map((action: actionCreators.LoadCommunicationContractEmployee) => action.payload),
    switchMap(employeeId =>
      this.employeesService.getInstance(employeeId).pipe(
        map((res: any) => {
          const employee = res.response.data;
          return employee
            ? new actionCreators.SetCommunicationContractEmployee(employee)
            : new actionCreators.SetCommunicationContractEmployee(null);
        }),
        catchError(error => throwError(error))
      )
    )
  );

  @Effect({ dispatch: false })
  redirectIfNoEmployee$ = this.actions$.pipe(
    ofType(actionConstants.SET_COMMUNICATION_CONTRACT_FARMER),
    map((action: actionCreators.SetCommunicationContractEmployee) => action.payload),
    map(employee => {
      if (!employee) {
        this.router.navigateByUrl('/employees');
      }
    })
  );

  @Effect()
  loadCommunicationContracts$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_COMMUNICATION_CONTRACTS),
    map((action: actionCreators.LoadCommunicationContracts) => action.payload),
    withLatestFrom(this.contractsStore$.pipe(select(selectCommunicationContractsSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.contractsService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<CommunicationContractModel>) =>
              new actionCreators.LoadCommunicationContractsSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadCommunicationContractsFail(error)))
        );
    })
  );



  /**
   * This effect reacts to the dispatch of a Delete Product action, and
   * attemps to perform that operation of the backend API.
   */
  @Effect()
  deleteCommunicationContract$ = this.actions$.pipe(
    ofType(actionConstants.DELETE_COMMUNICATION_CONTRACT),
    map((action: actionCreators.DeleteCommunicationContract) => action.payload),
    switchMap(contract =>
      this.contractsService.deleteItem(contract).pipe(
        map(() => new actionCreators.DeleteCommunicationContractSuccess(contract)),
        catchError(error => of(new actionCreators.DeleteCommunicationContract(error)))
      )
    )
  );

  /**
   * This effect reacts to the dispatch of a Add Product action, and
   * attemps to perform that operation of the backend API.
   */
  @Effect()
  addCommunicationContract$ = this.actions$.pipe(
    ofType(actionConstants.ADD_COMMUNICATION_CONTRACT),
    map((action: actionCreators.AddCommunicationContract) => action.payload),
    switchMap(contract =>
      this.contractsService.createItem(contract).pipe(
        map(() => new actionCreators.AddCommunicationContractSuccess()),
        catchError(error => of(new actionCreators.AddCommunicationContractFail(error)))
      )
    )
  );

  /**
   * This effect reacts to the dispatch of an Update Product action, and
   * attemps to perform that operation of the backend API.
   */
  @Effect()
  updateCommunicationContract$ = this.actions$.pipe(
    ofType(actionConstants.UPDATE_COMMUNICATION_CONTRACT),
    map((action: actionCreators.UpdateCommunicationContract) => action.payload),
    switchMap(contract =>
      this.contractsService.updateItem(contract).pipe(
        map(() => new actionCreators.UpdateCommunicationContractSuccess(contract)),
        catchError(error => of(new actionCreators.UpdateCommunicationContractFail(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  redirectOnSuccess$ = this.actions$.pipe(
    ofType(
      actionConstants.ADD_COMMUNICATION_CONTRACT_SUCCESS,
      actionConstants.UPDATE_COMMUNICATION_CONTRACT_SUCCESS
    ),
    // TODO: Check why router actions are not workind
    // meanwhile using normal router
    // map(() => new uiActions.Go({ path: ['/clients'] }))
    map(() => this.router.navigateByUrl('/communication-contracts'))
  );

  // NOTIFY SUCCESS
  @Effect({ dispatch: false })
  notifySuccess$ = this.actions$.pipe(
    ofType(...this.successActions),
    map((action: any) => {
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
    map((action: any) => {
      const messageKey = this.getNotificationMessageByAction(action.type);
      this.notificationService.showError(
        this.languageService.translate(messageKey)
      );
    })
  );

  @Effect()
  loadCommunicationContract$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_COMMUNICATION_CONTRACT),
    map((action: actionCreators.LoadCommunicationContract) => action.payload),
    switchMap((contractId: number) => {
      return this.contractsService
        .getInstance(contractId)
        .pipe(
          map(
            (response: {status, response}) =>
              new actionCreators.LoadCommunicationContractSuccess(response.response.data)
          ),
          catchError(error => of(new actionCreators.LoadCommunicationContractFail(error)))
        );
    })
  );

  private getNotificationMessageByAction(actionType: string) {
    const messageKeysMap = {
      [actionConstants.ADD_COMMUNICATION_CONTRACT_SUCCESS]: 'communication-contracts.notifications.add-success',
      [actionConstants.ADD_COMMUNICATION_CONTRACT_FAIL]: 'communication-contracts.notifications.add-failed',
      [actionConstants.UPDATE_COMMUNICATION_CONTRACT_SUCCESS]: 'communication-contracts.notifications.update-success',
      [actionConstants.UPDATE_COMMUNICATION_CONTRACT_FAIL]: 'communication-contracts.notifications.update-failed',
      [actionConstants.DELETE_COMMUNICATION_CONTRACT_SUCCESS]: 'communication-contracts.notifications.delete-success',
      [actionConstants.DELETE_COMMUNICATION_CONTRACT_FAIL]: 'communication-contracts.notifications.delete-failed'
    };
    return messageKeysMap[actionType];
  }

}
