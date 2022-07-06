import { Action } from '@ngrx/store';

import * as constants from '../constants/farmer.constant';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { FarmerModel } from '../../models/farmer.model';
import { PaginationInfo } from '../../../common/pagination';

export class LoadFarmers implements Action {
  readonly type = constants.LOAD_FARMERS;
  constructor(public payload: PaginationInfo) {}
}

export class LoadFarmersFail implements Action {
  readonly type = constants.LOAD_FARMERS_FAIL;
  constructor(public payload: any) {}
}

export class LoadFarmersSuccess implements Action {
  readonly type = constants.LOAD_FARMERS_SUCCESS;
  constructor(public payload: ServerResponse<FarmerModel>) {}
}

export class LoadFarmer implements Action {
  readonly type = constants.LOAD_FARMER;
  constructor(public payload: number) {}
}

export class LoadFarmerFail implements Action {
  readonly type = constants.LOAD_FARMER_FAIL;
  constructor(public payload: any) {}
}

export class LoadFarmerSuccess implements Action {
  readonly type = constants.LOAD_FARMER_SUCCESS;
  constructor(public payload: FarmerModel) {}
}

// DELETE
export class DeleteFarmer implements Action {
  readonly type = constants.DELETE_FARMER;
  constructor(public payload: FarmerModel) {}
}

export class DeleteFarmerFail implements Action {
  readonly type = constants.DELETE_FARMER_FAIL;
  constructor(public payload: any) {}
}

export class DeleteFarmerSuccess implements Action {
  readonly type = constants.DELETE_FARMER_SUCCESS;
  constructor(public payload: FarmerModel) {}
}

export class AddFarmer implements Action {
  readonly type = constants.ADD_FARMER;
  constructor(public payload: FarmerModel) {}
}

export class AddFarmerFail implements Action {
  readonly type = constants.ADD_FARMER_FAIL;
  constructor(public payload: any) {}
}

export class AddFarmerSuccess implements Action {
  readonly type = constants.ADD_FARMER_SUCCESS;
}

export class UpdateFarmer implements Action {
  readonly type = constants.UPDATE_FARMER;
  constructor(public payload: FarmerModel) {}
}

export class UpdateFarmerFail implements Action {
  readonly type = constants.UPDATE_FARMER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateFarmerSuccess implements Action {
  readonly type = constants.UPDATE_FARMER_SUCCESS;
  constructor(public payload: FarmerModel) {}
}

export class SetActiveFarmer implements Action {
  readonly type = constants.SET_ACTIVE_FARMER;
  constructor(public payload: FarmerModel) {}
}

// SEARCH
export class SetSearchTerms implements Action {
  readonly type = constants.SET_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearSearchTerms implements Action {
  readonly type = constants.CLEAR_SEARCH_TERMS;
}

export type farmerActions =
  | LoadFarmers
  | LoadFarmersFail
  | LoadFarmersSuccess
  | LoadFarmer
  | LoadFarmerFail
  | LoadFarmerSuccess
  | AddFarmer
  | AddFarmerFail
  | AddFarmerSuccess
  | UpdateFarmer
  | UpdateFarmerFail
  | UpdateFarmerSuccess
  | DeleteFarmer
  | DeleteFarmerFail
  | DeleteFarmerSuccess
  | SetActiveFarmer
  | SetSearchTerms
  | ClearSearchTerms;
