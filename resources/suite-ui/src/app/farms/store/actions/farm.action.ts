import { Action } from '@ngrx/store';

import * as constants from '../constants/farm.constant';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { FarmModel } from '../../models/farm.model';
import { PaginationInfo } from '../../../common/pagination';
import {FarmerModel} from '../../../farmers/models/farmer.model';
/*import {FarmerModel} from '../../../farmers/models/farmer.model';*/

export class LoadFarms implements Action {
  readonly type = constants.LOAD_FARMS;
  constructor(public payload: PaginationInfo) {}
}

export class LoadFarmsFail implements Action {
  readonly type = constants.LOAD_FARMS_FAIL;
  constructor(public payload: any) {}
}

export class LoadFarmsSuccess implements Action {
  readonly type = constants.LOAD_FARMS_SUCCESS;
  constructor(public payload: ServerResponse<FarmModel>) {}
}

export class LoadFarm implements Action {
  readonly type = constants.LOAD_FARM;
  constructor(public payload: number) {}
}

export class LoadFarmFail implements Action {
  readonly type = constants.LOAD_FARM_FAIL;
  constructor(public payload: any) {}
}

export class LoadFarmSuccess implements Action {
  readonly type = constants.LOAD_FARM_SUCCESS;
  constructor(public payload: FarmModel) {}
}

// DELETE
export class DeleteFarm implements Action {
  readonly type = constants.DELETE_FARM;
  constructor(public payload: FarmModel) {}
}

export class DeleteFarmFail implements Action {
  readonly type = constants.DELETE_FARM_FAIL;
  constructor(public payload: any) {}
}

export class DeleteFarmSuccess implements Action {
  readonly type = constants.DELETE_FARM_SUCCESS;
  constructor(public payload: FarmModel) {}
}

export class AddFarm implements Action {
  readonly type = constants.ADD_FARM;
  constructor(public payload: FarmModel) {}
}

export class AddFarmFail implements Action {
  readonly type = constants.ADD_FARM_FAIL;
  constructor(public payload: any) {}
}

export class AddFarmSuccess implements Action {
  readonly type = constants.ADD_FARM_SUCCESS;
}

export class UpdateFarm implements Action {
  readonly type = constants.UPDATE_FARM;
  constructor(public payload: FarmModel) {}
}

export class UpdateFarmFail implements Action {
  readonly type = constants.UPDATE_FARM_FAIL;
  constructor(public payload: any) {}
}

export class UpdateFarmSuccess implements Action {
  readonly type = constants.UPDATE_FARM_SUCCESS;
  constructor(public payload: FarmModel) {}
}

export class SetActiveFarm implements Action {
  readonly type = constants.SET_ACTIVE_FARM;
  constructor(public payload: FarmModel) {}
}

export class LoadFarmFarmer implements Action {
  readonly type = constants.LOAD_FARM_FARMER;
  constructor(public payload: number | string) {}
}

export class SetFarmFarmer implements Action {
  readonly type = constants.SET_FARM_FARMER;
  constructor(public payload: FarmerModel) {}
}

export class ClearFarmFarmer implements Action {
  readonly type = constants.CLEAR_FARM_FARMER;
}

// SEARCH
export class SetSearchTerms implements Action {
  readonly type = constants.SET_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearSearchTerms implements Action {
  readonly type = constants.CLEAR_SEARCH_TERMS;
}

export type farmActions =
  | LoadFarms
  | LoadFarmsFail
  | LoadFarmsSuccess
  | LoadFarm
  | LoadFarmFail
  | LoadFarmSuccess
  | AddFarm
  | AddFarmFail
  | AddFarmSuccess
  | UpdateFarm
  | UpdateFarmFail
  | UpdateFarmSuccess
  | DeleteFarm
  | DeleteFarmFail
  | DeleteFarmSuccess
  | SetActiveFarm
  | LoadFarmFarmer
  | SetFarmFarmer
  | ClearFarmFarmer
  | SetSearchTerms
  | ClearSearchTerms;
