import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/contract.constant';
import * as actionCreators from '../actions/contract.action';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { ContractModel } from '../../models/contract.model';
import { ContractsService } from '../../services/contracts.service';
import { select, Store } from '@ngrx/store';
import { ContractFeatureState } from '../reducers';
import { selectContractsSearchTerms } from '../selectors';
import { NotificationService } from 'src/app/common/services/notification.service';
import { LanguageService } from 'src/app/i18n/services/language.service';
import { Router } from '@angular/router';
import { FarmersService } from '../../../farmers/services/farmers.service';

@Injectable()
export class ContractEffects {
  constructor(
    private actions$: Actions,
    private contractsService: ContractsService,
    private contractsStore$: Store<ContractFeatureState>,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private router: Router,
    private farmersService: FarmersService,
  ) { }

  private asyncActions = [
    actionConstants.ADD_CONTRACT,
    actionConstants.ADD_CONTRACT_AND_CONTINUE,
    actionConstants.UPDATE_CONTRACT,
    actionConstants.DELETE_CONTRACT,
    actionConstants.LOAD_CONTRACTS
  ];
  private successActions = [
    actionConstants.ADD_CONTRACT_SUCCESS,
    actionConstants.UPDATE_CONTRACT_SUCCESS,
    actionConstants.DELETE_CONTRACT_SUCCESS,
    actionConstants.ADD_CONTRACT_AND_CONTINUE_SUCCESS,
  ];
  private failActions = [
    actionConstants.ADD_CONTRACT_FAIL,
    actionConstants.UPDATE_CONTRACT_FAIL,
    actionConstants.DELETE_CONTRACT_FAIL
  ];

  /**
   * Loads the client that will be assigned to the offer
   */
  @Effect()
  loadContractFarmer$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_CONTRACT_FARMER),
    map((action: actionCreators.LoadContractFarmer) => action.payload),
    switchMap(farmerId =>
      this.farmersService.getInstance(farmerId).pipe(
        map((res: any) => {
          const farmer = res.response.data;
          return farmer
            ? new actionCreators.SetContractFarmer(farmer)
            : new actionCreators.SetContractFarmer(null);
        }),
        catchError(error => throwError(error))
      )
    )
  );

  @Effect({ dispatch: false })
  redirectIfNoFarmer$ = this.actions$.pipe(
    ofType(actionConstants.SET_CONTRACT_FARMER),
    map((action: actionCreators.SetContractFarmer) => action.payload),
    map(farmer => {
      if (!farmer) {
        this.router.navigateByUrl('/farmers');
      }
    })
  );

  @Effect()
  loadContracts$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_CONTRACTS),
    map((action: actionCreators.LoadContracts) => action.payload),
    withLatestFrom(this.contractsStore$.pipe(select(selectContractsSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.contractsService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<ContractModel>) =>
              new actionCreators.LoadContractsSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadContractsFail(error)))
        );
    })
  );



  /**
   * This effect reacts to the dispatch of a Delete Product action, and
   * attemps to perform that operation of the backend API.
   */
  @Effect()
  deleteContract$ = this.actions$.pipe(
    ofType(actionConstants.DELETE_CONTRACT),
    map((action: actionCreators.DeleteContract) => action.payload),
    switchMap(contract =>
      this.contractsService.deleteItem(contract).pipe(
        map(() => new actionCreators.DeleteContractSuccess(contract)),
        catchError(error => of(new actionCreators.DeleteContract(error)))
      )
    )
  );

  /**
   * This effect reacts to the dispatch of a Add Product action, and
   * attemps to perform that operation of the backend API.
   */
  @Effect()
  addContract$ = this.actions$.pipe(
    ofType(actionConstants.ADD_CONTRACT),
    map((action: actionCreators.AddContract) => action.payload),
    switchMap(contract =>
      this.contractsService.createItem(contract).pipe(
        map(() => new actionCreators.AddContractSuccess()),
        catchError(error => of(new actionCreators.AddContractFail(error)))
      )
    )
  );

  /**
   * This effect reacts to the dispatch of a Add Product action, and
   * attemps to perform that operation of the backend API & continue Add Product
   */
  @Effect()
  addContractAndContinue$ = this.actions$.pipe(
    ofType(actionConstants.ADD_CONTRACT_AND_CONTINUE),
    map((action: actionCreators.AddContractAndContinue) => action.payload),
    switchMap(contract =>
      this.contractsService.createItem(contract).pipe(
        // tslint:disable-next-line:max-line-length
        map(() => new actionCreators.AddContractAndContinueSuccess()), /*new actionCreators.LoadContractFarmer(1)*/
        catchError(error => of(new actionCreators.AddContractFail(error)))
      )
    )
  );

  /**
   * This effect reacts to the dispatch of an Update Product action, and
   * attemps to perform that operation of the backend API.
   */
  @Effect()
  updateContract$ = this.actions$.pipe(
    ofType(actionConstants.UPDATE_CONTRACT),
    map((action: actionCreators.UpdateContract) => action.payload),
    switchMap(contract =>
      this.contractsService.updateItem(contract).pipe(
        map(() => new actionCreators.UpdateContractSuccess(contract)),
        catchError(error => of(new actionCreators.UpdateContractFail(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  redirectOnSuccess$ = this.actions$.pipe(
    ofType(
      actionConstants.ADD_CONTRACT_SUCCESS,
      actionConstants.UPDATE_CONTRACT_SUCCESS
    ),
    // TODO: Check why router actions are not workind
    // meanwhile using normal router
    // map(() => new uiActions.Go({ path: ['/clients'] }))
    map(() => this.router.navigateByUrl('/contracts'))
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
  loadContract$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_CONTRACT),
    map((action: actionCreators.LoadContract) => action.payload),
    switchMap((contractId: number) => {
      return this.contractsService
        .getInstance(contractId)
        .pipe(
          map(
            (response: { status, response }) =>
              new actionCreators.LoadContractSuccess(response.response.data)
          ),
          catchError(error => of(new actionCreators.LoadContractFail(error)))
        );
    })
  );

  private getNotificationMessageByAction(actionType: string) {
    const messageKeysMap = {
      [actionConstants.ADD_CONTRACT_SUCCESS]: 'contracts.notifications.add-success',
      [actionConstants.ADD_CONTRACT_FAIL]: 'contracts.notifications.add-failed',
      [actionConstants.UPDATE_CONTRACT_SUCCESS]: 'contracts.notifications.update-success',
      [actionConstants.UPDATE_CONTRACT_FAIL]: 'contracts.notifications.update-failed',
      [actionConstants.DELETE_CONTRACT_SUCCESS]: 'contracts.notifications.delete-success',
      [actionConstants.DELETE_CONTRACT_FAIL]: 'contracts.notifications.delete-failed',
      [actionConstants.ADD_CONTRACT_AND_CONTINUE_SUCCESS]: 'contracts.notifications.add-success'
    };
    return messageKeysMap[actionType];
  }

}
