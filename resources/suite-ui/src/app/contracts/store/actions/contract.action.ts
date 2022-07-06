import { Action } from '@ngrx/store';

import * as constants from '../constants/contract.constant';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { ContractModel } from '../../models/contract.model';
import { PaginationInfo } from '../../../common/pagination';
import {FarmerModel} from '../../../farmers/models/farmer.model';

export class LoadContracts implements Action {
  readonly type = constants.LOAD_CONTRACTS;
  constructor(public payload: PaginationInfo) {}
}

export class LoadContractsFail implements Action {
  readonly type = constants.LOAD_CONTRACTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadContractsSuccess implements Action {
  readonly type = constants.LOAD_CONTRACTS_SUCCESS;
  constructor(public payload: ServerResponse<ContractModel>) {}
}

export class LoadContract implements Action {
  readonly type = constants.LOAD_CONTRACT;
  constructor(public payload: number) {}
}

export class LoadContractFail implements Action {
  readonly type = constants.LOAD_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class LoadContractSuccess implements Action {
  readonly type = constants.LOAD_CONTRACT_SUCCESS;
  constructor(public payload: ContractModel) {}
}

// DELETE
export class DeleteContract implements Action {
  readonly type = constants.DELETE_CONTRACT;
  constructor(public payload: ContractModel) {}
}

export class DeleteContractFail implements Action {
  readonly type = constants.DELETE_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class DeleteContractSuccess implements Action {
  readonly type = constants.DELETE_CONTRACT_SUCCESS;
  constructor(public payload: ContractModel) {}
}

export class AddContract implements Action {
  readonly type = constants.ADD_CONTRACT;
  constructor(public payload: ContractModel) {}
}

export class AddContractAndContinue implements Action {
  readonly type = constants.ADD_CONTRACT_AND_CONTINUE;
  constructor(public payload: ContractModel) {}
}

export class AddContractFail implements Action {
  readonly type = constants.ADD_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class AddContractSuccess implements Action {
  readonly type = constants.ADD_CONTRACT_SUCCESS;
}

export class AddContractAndContinueSuccess implements Action {
  readonly type = constants.ADD_CONTRACT_AND_CONTINUE_SUCCESS;
}

export class UpdateContract implements Action {
  readonly type = constants.UPDATE_CONTRACT;
  constructor(public payload: ContractModel) {}
}

export class UpdateContractFail implements Action {
  readonly type = constants.UPDATE_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateContractSuccess implements Action {
  readonly type = constants.UPDATE_CONTRACT_SUCCESS;
  constructor(public payload: ContractModel) {}
}

export class SetActiveContract implements Action {
  readonly type = constants.SET_ACTIVE_CONTRACT;
  constructor(public payload: ContractModel) {}
}

export class LoadContractFarmer implements Action {
  readonly type = constants.LOAD_CONTRACT_FARMER;
  constructor(public payload: number | string) {}
}

export class SetContractFarmer implements Action {
  readonly type = constants.SET_CONTRACT_FARMER;
  constructor(public payload: FarmerModel) {}
}

export class ClearContractFarmer implements Action {
  readonly type = constants.CLEAR_CONTRACT_FARMER;
}

// SEARCH
export class SetSearchTerms implements Action {
  readonly type = constants.SET_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearSearchTerms implements Action {
  readonly type = constants.CLEAR_SEARCH_TERMS;
}

export type contractActions =
  | LoadContracts
  | LoadContractsFail
  | LoadContractsSuccess
  | LoadContract
  | LoadContractFail
  | LoadContractSuccess
  | AddContract
  | AddContractAndContinue
  | AddContractFail
  | AddContractSuccess
  | AddContractAndContinueSuccess
  | UpdateContract
  | UpdateContractFail
  | UpdateContractSuccess
  | DeleteContract
  | DeleteContractFail
  | DeleteContractSuccess
  | SetActiveContract
  | LoadContractFarmer
  | SetContractFarmer
  | ClearContractFarmer
  | SetSearchTerms
  | ClearSearchTerms;
