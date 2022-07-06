import { Action } from '@ngrx/store';

import * as constants from '../constants/cl-payment.constant';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { CLPaymentModel } from '../../models/cl-payment.model';
import { PaginationInfo } from '../../../common/pagination';

export class LoadCLPayments implements Action {
  readonly type = constants.LOAD_CL_PAYMENTS;
  constructor(public payload: PaginationInfo) {}
}

export class LoadCLPaymentsFail implements Action {
  readonly type = constants.LOAD_CL_PAYMENTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadCLPaymentsSuccess implements Action {
  readonly type = constants.LOAD_CL_PAYMENTS_SUCCESS;
  constructor(public payload: ServerResponse<CLPaymentModel>) {}
}

// SEARCH
export class SetCLPaymentsSearchTerms implements Action {
  readonly type = constants.SET_CL_PAYMENTS_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearCLPaymentsSearchTerms implements Action {
  readonly type = constants.CLEAR_CL_PAYMENTS_SEARCH_TERMS;
}

export type CLPaymentActions =
  | LoadCLPayments
  | LoadCLPaymentsFail
  | LoadCLPaymentsSuccess
  | SetCLPaymentsSearchTerms
  | ClearCLPaymentsSearchTerms;
