import { Action } from '@ngrx/store';

import * as constants from '../constants/mobile.constant';
import { MobileModel } from '../../models/mobile.model';
import { PaginationInfo } from 'src/app/common/pagination';
import { ServerResponse } from 'src/app/common/models/ServerResponse';

export class LoadMobiles implements Action {
  readonly type = constants.LOAD_MOBILES;
  constructor(public payload: PaginationInfo) {}
}

export class LoadMobilesFail implements Action {
  readonly type = constants.LOAD_MOBILES_FAIL;
  constructor(public payload: any) {}
}

export class LoadMobilesSuccess implements Action {
  readonly type = constants.LOAD_MOBILES_SUCCESS;
  constructor(public payload: ServerResponse<MobileModel>) {}
}

export class LoadMobile implements Action {
  readonly type = constants.LOAD_MOBILE;
  constructor(public payload: number) {}
}

export class LoadMobileFail implements Action {
  readonly type = constants.LOAD_MOBILE_FAIL;
  constructor(public payload: any) {}
}

export class LoadMobileSuccess implements Action {
  readonly type = constants.LOAD_MOBILE_SUCCESS;
  constructor(public payload: MobileModel) {}
}

// DELETE
export class DeleteMobile implements Action {
  readonly type = constants.DELETE_MOBILE;
  constructor(public payload: MobileModel) {}
}

export class DeleteMobileFail implements Action {
  readonly type = constants.DELETE_MOBILE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteMobileSuccess implements Action {
  readonly type = constants.DELETE_MOBILE_SUCCESS;
  constructor(public payload: MobileModel) {}
}

export class AddMobile implements Action {
  readonly type = constants.ADD_MOBILE;
  constructor(public payload: MobileModel) {}
}

export class AddMobileFail implements Action {
  readonly type = constants.ADD_MOBILE_FAIL;
  constructor(public payload: any) {}
}

export class AddMobileSuccess implements Action {
  readonly type = constants.ADD_MOBILE_SUCCESS;
}

export class UpdateMobile implements Action {
  readonly type = constants.UPDATE_MOBILE;
  constructor(public payload: MobileModel) {}
}

export class UpdateMobileFail implements Action {
  readonly type = constants.UPDATE_MOBILE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateMobileSuccess implements Action {
  readonly type = constants.UPDATE_MOBILE_SUCCESS;
  constructor(public payload: MobileModel) {}
}

export class SetActiveMobile implements Action {
  readonly type = constants.SET_ACTIVE_MOBILE;
  constructor(public payload: MobileModel) {}
}

// SEARCH
export class SetMobileSearchTerms implements Action {
  readonly type = constants.SET_MOBILE_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearMobileSearchTerms implements Action {
  readonly type = constants.CLEAR_MOBILE_SEARCH_TERMS;
}

export type mobileActions =
  | LoadMobiles
  | LoadMobilesFail
  | LoadMobilesSuccess
  | LoadMobile
  | LoadMobileFail
  | LoadMobileSuccess
  | AddMobile
  | AddMobileFail
  | AddMobileSuccess
  | UpdateMobile
  | UpdateMobileFail
  | UpdateMobileSuccess
  | DeleteMobile
  | DeleteMobileFail
  | DeleteMobileSuccess
  | SetActiveMobile
  | SetMobileSearchTerms
  | ClearMobileSearchTerms;
