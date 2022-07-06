import { Action } from '@ngrx/store';

import * as constants from '../constants/cl.constant';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { CLModel } from '../../models/cl.model';
import { PaginationInfo } from '../../../common/pagination';

export class LoadCLs implements Action {
  readonly type = constants.LOAD_CLS;
  constructor(public payload: PaginationInfo) {}
}

export class LoadCLsFail implements Action {
  readonly type = constants.LOAD_CLS_FAIL;
  constructor(public payload: any) {}
}

export class LoadCLsSuccess implements Action {
  readonly type = constants.LOAD_CLS_SUCCESS;
  constructor(public payload: ServerResponse<CLModel>) {}
}

// SEARCH
export class SetSearchTerms implements Action {
  readonly type = constants.SET_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearSearchTerms implements Action {
  readonly type = constants.CLEAR_SEARCH_TERMS;
}

// PROCESS SELECTED CLS
export class ProcessSelectedCLs implements Action {
  readonly type = constants.PROCESS_SELECTED_CLS;
  constructor(public payload: string[]) {}
}

export class ProcessSelectedCLsFail implements Action {
  readonly type = constants.PROCESS_SELECTED_CLS_FAIL;
  constructor(public payload: any) {}
}

export class ProcessSelectedCLsSuccess implements Action {
  readonly type = constants.PROCESS_SELECTED_CLS_SUCCESS;
  constructor(public payload: string[]) {}
}

export class SetActiveCls implements Action {
  readonly type = constants.SET_ACTIVE_CLS;
  constructor(public payload: CLModel[]) {}
}

// UPDATE FROM SIPAC
export class UpdateFromSIPAC implements Action {
  readonly type = constants.UPDATE_FROM_SIPAC;
}

export class UpdateFromSIPACFail implements Action {
  readonly type = constants.UPDATE_FROM_SIPAC_FAIL;
  constructor(public payload: any) {}
}

export class UpdateFromSIPACSuccess implements Action {
  readonly type = constants.UPDATE_FROM_SIPAC_SUCCESS;
}

export type clActions =
  | LoadCLs
  | LoadCLsFail
  | LoadCLsSuccess
  | SetSearchTerms
  | ClearSearchTerms
  | ProcessSelectedCLs
  | ProcessSelectedCLsFail
  | ProcessSelectedCLsSuccess
  | SetActiveCls
  | UpdateFromSIPAC
  | UpdateFromSIPACSuccess
  | UpdateFromSIPACFail;
