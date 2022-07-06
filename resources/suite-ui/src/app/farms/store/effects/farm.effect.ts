import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as actionConstants from '../constants/farm.constant';
import * as actionCreators from '../actions/farm.action';
import {switchMap, map, catchError, withLatestFrom} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {ServerResponse} from '../../../common/models/ServerResponse';
import {FarmModel} from '../../models/farm.model';
import {FarmsService} from '../../services/farms.service';
import {select, Store} from '@ngrx/store';
import {FarmFeatureState} from '../reducers';
import {selectFarmsSearchTerms} from '../selectors';
import {NotificationService} from 'src/app/common/services/notification.service';
import {LanguageService} from 'src/app/i18n/services/language.service';
import {Router} from '@angular/router';
import {FarmersService} from '../../../farmers/services/farmers.service';

@Injectable()
export class FarmEffects {
    constructor(private actions$: Actions,
                private farmsService: FarmsService,
                private farmsStore$: Store<FarmFeatureState>,
                private notificationService: NotificationService,
                private languageService: LanguageService,
                private router: Router,
                private farmersService: FarmersService,) {
    }

    private asyncActions = [
        actionConstants.ADD_FARM,
        actionConstants.UPDATE_FARM,
        actionConstants.DELETE_FARM,
        actionConstants.LOAD_FARMS
    ];
    private successActions = [
        actionConstants.ADD_FARM_SUCCESS,
        actionConstants.UPDATE_FARM_SUCCESS,
        actionConstants.DELETE_FARM_SUCCESS
    ];
    private failActions = [
        actionConstants.ADD_FARM_FAIL,
        actionConstants.UPDATE_FARM_FAIL,
        actionConstants.DELETE_FARM_FAIL
    ];

    /**
     * Loads the client that will be assigned to the offer
     */
    @Effect()
    loadFarmFarmer$ = this.actions$.pipe(
        ofType(actionConstants.LOAD_FARM_FARMER),
        map((action: actionCreators.LoadFarmFarmer) => action.payload),
        switchMap(farmerId =>
            this.farmersService.getInstance(farmerId).pipe(
                map((res: any) => {
                    const farmer = res.response.data;
                    return farmer
                        ? new actionCreators.SetFarmFarmer(farmer)
                        : new actionCreators.SetFarmFarmer(null);
                }),
                catchError(error => throwError(error))
            )
        )
    );

    @Effect({dispatch: false})
    redirectIfNoFarmer$ = this.actions$.pipe(
        ofType(actionConstants.SET_FARM_FARMER),
        map((action: actionCreators.SetFarmFarmer) => action.payload),
        map(farmer => {
            if (!farmer) {
                this.router.navigateByUrl('/farmers');
            }
        })
    );

    @Effect()
    loadFarms$ = this.actions$.pipe(
        ofType(actionConstants.LOAD_FARMS),
        map((action: actionCreators.LoadFarms) => action.payload),
        withLatestFrom(this.farmsStore$.pipe(select(selectFarmsSearchTerms))),
        switchMap(([{page, itemsPerPage}, terms = {}]) => {
            return this.farmsService
                .searchItems({page, size: itemsPerPage, ...terms})
                .pipe(
                    map(
                        (res: ServerResponse<FarmModel>) =>
                            new actionCreators.LoadFarmsSuccess(res)
                    ),
                    catchError(error => of(new actionCreators.LoadFarmsFail(error)))
                );
        })
    );


    /**
     * This effect reacts to the dispatch of a Delete Product action, and
     * attemps to perform that operation of the backend API.
     */
    /* @Effect()
     deleteFarm$ = this.actions$.pipe(
     ofType(actionConstants.DELETE_FARM),
     map((action: actionCreators.DeleteFarm) => action.payload),
     switchMap(contract =>
     this.farmersService.deleteItem(farm).pipe(
     map(() => new actionCreators.DeleteContractSuccess(contract)),
     catchError(error => of(new actionCreators.DeleteContract(error)))
     )
     )
     );*/

    /**
     * This effect reacts to the dispatch of a Add Product action, and
     * attemps to perform that operation of the backend API.
     */
    @Effect()
    addFarm$ = this.actions$.pipe(
        ofType(actionConstants.ADD_FARM),
        map((action: actionCreators.AddFarm) => action.payload),
        switchMap(farm =>
            this.farmsService.createItem(farm).pipe(
                map(() => new actionCreators.AddFarmSuccess()),
                catchError(error => of(new actionCreators.AddFarmFail(error)))
            )
        )
    );

    /**
     * This effect reacts to the dispatch of an Update Product action, and
     * attemps to perform that operation of the backend API.
     */
    @Effect()
    updateFarm$ = this.actions$.pipe(
        ofType(actionConstants.UPDATE_FARM),
        map((action: actionCreators.UpdateFarm) => action.payload),
        switchMap(farm =>
            this.farmsService.updateItem(farm).pipe(
                map(() => new actionCreators.UpdateFarmSuccess(farm)),
                catchError(error => of(new actionCreators.UpdateFarmFail(error)))
            )
        )
    );

    @Effect({dispatch: false})
    redirectOnSuccess$ = this.actions$.pipe(
        ofType(
            actionConstants.ADD_FARM_SUCCESS,
            actionConstants.UPDATE_FARM_SUCCESS
        ),
        // TODO: Check why router actions are not workind
        // meanwhile using normal router
        // map(() => new uiActions.Go({ path: ['/clients'] }))
        map(() => this.router.navigateByUrl('/farms'))
    );

    // NOTIFY SUCCESS
    @Effect({dispatch: false})
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
    @Effect({dispatch: false})
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
    loadFarm$ = this.actions$.pipe(
        ofType(actionConstants.LOAD_FARM),
        map((action: actionCreators.LoadFarm) => action.payload),
        switchMap((farmId: number) => {
            return this.farmsService
                .getInstance(farmId)
                .pipe(
                    map(
                        (response: { status, response }) =>
                            new actionCreators.LoadFarmSuccess(response.response.data)
                    ),
                    catchError(error => of(new actionCreators.LoadFarmFail(error)))
                );
        })
    );

    private getNotificationMessageByAction(actionType: string) {
        const messageKeysMap = {
            [actionConstants.ADD_FARM_SUCCESS]: 'farms.notifications.add-success',
            [actionConstants.ADD_FARM_FAIL]: 'farms.notifications.add-failed',
            [actionConstants.UPDATE_FARM_SUCCESS]: 'farms.notifications.update-success',
            [actionConstants.UPDATE_FARM_FAIL]: 'farms.notifications.update-failed',
            [actionConstants.DELETE_FARM_SUCCESS]: 'farms.notifications.delete-success',
            [actionConstants.DELETE_FARM_FAIL]: 'farms.notifications.delete-failed'
        };
        return messageKeysMap[actionType];
    }

}
