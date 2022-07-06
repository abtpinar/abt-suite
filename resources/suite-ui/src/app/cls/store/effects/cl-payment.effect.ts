import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/cl-payment.constant';
import * as actionCreators from '../actions/cl-payment.action';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { CLPaymentModel } from '../../models/cl-payment.model';
import { CLPaymentsService } from '../../services/cl-payments.service';
import { select, Store } from '@ngrx/store';
import { CLFeatureState } from '../reducers';
import { selectCLPaymentsSearchTerms } from '../selectors';

@Injectable()
export class CLPaymentEffects {
  constructor(
    private actions$: Actions,
    private clsService: CLPaymentsService,
    private clsStore$: Store<CLFeatureState>
  ) {}

  asyncActions = [actionConstants.LOAD_CL_PAYMENTS];

  successActions = [];

  failActions = [];

  @Effect()
  loadCLPayments$ = this.actions$.pipe(
    ofType(actionConstants.LOAD_CL_PAYMENTS),
    map((action: actionCreators.LoadCLPayments) => action.payload),
    withLatestFrom(this.clsStore$.pipe(select(selectCLPaymentsSearchTerms))),
    switchMap(([{ page, itemsPerPage }, terms = {}]) => {
      return this.clsService
        .searchItems({ page, size: itemsPerPage, ...terms })
        .pipe(
          map(
            (res: ServerResponse<CLPaymentModel>) =>
              new actionCreators.LoadCLPaymentsSuccess(res)
          ),
          catchError(error => of(new actionCreators.LoadCLPaymentsFail(error)))
        );
    })
  );
}
