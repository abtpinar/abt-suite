import { Action } from '@ngrx/store';

import * as constants from '../constants/production-unit.constant';
import { ProductionUnitModel } from '../../models/production-unit.model';
import { PaginationInfo } from 'src/app/common/pagination';
import { ServerResponse } from 'src/app/common/models/ServerResponse';

export class LoadProductionUnits implements Action {
  readonly type = constants.LOAD_PRODUCTION_UNITS;
  constructor(public payload: PaginationInfo) {}
}

export class LoadProductionUnitsFail implements Action {
  readonly type = constants.LOAD_PRODUCTION_UNITS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductionUnitsSuccess implements Action {
  readonly type = constants.LOAD_PRODUCTION_UNITS_SUCCESS;
  constructor(public payload: ServerResponse<ProductionUnitModel>) {}
}

export class LoadProductionUnit implements Action {
  readonly type = constants.LOAD_PRODUCTION_UNIT;
  constructor(public payload: number) {}
}

export class LoadProductionUnitFail implements Action {
  readonly type = constants.LOAD_PRODUCTION_UNIT_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductionUnitSuccess implements Action {
  readonly type = constants.LOAD_PRODUCTION_UNIT_SUCCESS;
  constructor(public payload: ProductionUnitModel) {}
}

// DELETE
export class DeleteProductionUnit implements Action {
  readonly type = constants.DELETE_PRODUCTION_UNIT;
  constructor(public payload: ProductionUnitModel) {}
}

export class DeleteProductionUnitFail implements Action {
  readonly type = constants.DELETE_PRODUCTION_UNIT_FAIL;
  constructor(public payload: any) {}
}

export class DeleteProductionUnitSuccess implements Action {
  readonly type = constants.DELETE_PRODUCTION_UNIT_SUCCESS;
  constructor(public payload: ProductionUnitModel) {}
}

export class AddProductionUnit implements Action {
  readonly type = constants.ADD_PRODUCTION_UNIT;
  constructor(public payload: ProductionUnitModel) {}
}

export class AddProductionUnitFail implements Action {
  readonly type = constants.ADD_PRODUCTION_UNIT_FAIL;
  constructor(public payload: any) {}
}

export class AddProductionUnitSuccess implements Action {
  readonly type = constants.ADD_PRODUCTION_UNIT_SUCCESS;
}

export class UpdateProductionUnit implements Action {
  readonly type = constants.UPDATE_PRODUCTION_UNIT;
  constructor(public payload: ProductionUnitModel) {}
}

export class UpdateProductionUnitFail implements Action {
  readonly type = constants.UPDATE_PRODUCTION_UNIT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateProductionUnitSuccess implements Action {
  readonly type = constants.UPDATE_PRODUCTION_UNIT_SUCCESS;
  constructor(public payload: ProductionUnitModel) {}
}

export class SetActiveProductionUnit implements Action {
  readonly type = constants.SET_ACTIVE_PRODUCTION_UNIT;
  constructor(public payload: ProductionUnitModel) {}
}

// SEARCH
export class SetProductionUnitSearchTerms implements Action {
  readonly type = constants.SET_PRODUCTION_UNIT_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearProductionUnitSearchTerms implements Action {
  readonly type = constants.CLEAR_PRODUCTION_UNIT_SEARCH_TERMS;
}

export type classActions =
  | LoadProductionUnits
  | LoadProductionUnitsFail
  | LoadProductionUnitsSuccess
  | LoadProductionUnit
  | LoadProductionUnitFail
  | LoadProductionUnitSuccess
  | AddProductionUnit
  | AddProductionUnitFail
  | AddProductionUnitSuccess
  | UpdateProductionUnit
  | UpdateProductionUnitFail
  | UpdateProductionUnitSuccess
  | DeleteProductionUnit
  | DeleteProductionUnitFail
  | DeleteProductionUnitSuccess
  | SetActiveProductionUnit
  | SetProductionUnitSearchTerms
  | ClearProductionUnitSearchTerms;
