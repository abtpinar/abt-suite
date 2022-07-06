import { Action } from '@ngrx/store';

import * as constants from '../constants/sim.constant';
import { SimModel } from '../../models/sim.model';
import { PaginationInfo } from 'src/app/common/pagination';
import { ServerResponse } from 'src/app/common/models/ServerResponse';

export class LoadSims implements Action {
  readonly type = constants.LOAD_SIMS;
  constructor(public payload: PaginationInfo) {}
}

export class LoadSimsFail implements Action {
  readonly type = constants.LOAD_SIMS_FAIL;
  constructor(public payload: any) {}
}

export class LoadSimsSuccess implements Action {
  readonly type = constants.LOAD_SIMS_SUCCESS;
  constructor(public payload: ServerResponse<SimModel>) {}
}

export class LoadSim implements Action {
  readonly type = constants.LOAD_SIM;
  constructor(public payload: number) {}
}

export class LoadSimFail implements Action {
  readonly type = constants.LOAD_SIM_FAIL;
  constructor(public payload: any) {}
}

export class LoadSimSuccess implements Action {
  readonly type = constants.LOAD_SIM_SUCCESS;
  constructor(public payload: SimModel) {}
}

// DELETE
export class DeleteSim implements Action {
  readonly type = constants.DELETE_SIM;
  constructor(public payload: SimModel) {}
}

export class DeleteSimFail implements Action {
  readonly type = constants.DELETE_SIM_FAIL;
  constructor(public payload: any) {}
}

export class DeleteSimSuccess implements Action {
  readonly type = constants.DELETE_SIM_SUCCESS;
  constructor(public payload: SimModel) {}
}

export class AddSim implements Action {
  readonly type = constants.ADD_SIM;
  constructor(public payload: SimModel) {}
}

export class AddSimFail implements Action {
  readonly type = constants.ADD_SIM_FAIL;
  constructor(public payload: any) {}
}

export class AddSimSuccess implements Action {
  readonly type = constants.ADD_SIM_SUCCESS;
}

export class UpdateSim implements Action {
  readonly type = constants.UPDATE_SIM;
  constructor(public payload: SimModel) {}
}

export class UpdateSimFail implements Action {
  readonly type = constants.UPDATE_SIM_FAIL;
  constructor(public payload: any) {}
}

export class UpdateSimSuccess implements Action {
  readonly type = constants.UPDATE_SIM_SUCCESS;
  constructor(public payload: SimModel) {}
}

export class SetActiveSim implements Action {
  readonly type = constants.SET_ACTIVE_SIM;
  constructor(public payload: SimModel) {}
}

// SEARCH
export class SetSimSearchTerms implements Action {
  readonly type = constants.SET_SIM_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearSimSearchTerms implements Action {
  readonly type = constants.CLEAR_SIM_SEARCH_TERMS;
}

export type simActions =
  | LoadSims
  | LoadSimsFail
  | LoadSimsSuccess
  | LoadSim
  | LoadSimFail
  | LoadSimSuccess
  | AddSim
  | AddSimFail
  | AddSimSuccess
  | UpdateSim
  | UpdateSimFail
  | UpdateSimSuccess
  | DeleteSim
  | DeleteSimFail
  | DeleteSimSuccess
  | SetActiveSim
  | SetSimSearchTerms
  | ClearSimSearchTerms;
