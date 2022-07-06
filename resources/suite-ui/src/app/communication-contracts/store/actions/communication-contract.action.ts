import { Action } from '@ngrx/store';

import * as constants from '../constants/communication-contract.constant';
import { ServerResponse } from '../../../common/models/ServerResponse';
import { CommunicationContractModel } from '../../models/communication-contract.model';
import { PaginationInfo } from '../../../common/pagination';
import {EmployeeModel} from '../../../employees/models/employee.model';

export class LoadCommunicationContracts implements Action {
  readonly type = constants.LOAD_COMMUNICATION_CONTRACTS;
  constructor(public payload: PaginationInfo) {}
}

export class LoadCommunicationContractsFail implements Action {
  readonly type = constants.LOAD_COMMUNICATION_CONTRACTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadCommunicationContractsSuccess implements Action {
  readonly type = constants.LOAD_COMMUNICATION_CONTRACTS_SUCCESS;
  constructor(public payload: ServerResponse<CommunicationContractModel>) {}
}

export class LoadCommunicationContract implements Action {
  readonly type = constants.LOAD_COMMUNICATION_CONTRACT;
  constructor(public payload: number) {}
}

export class LoadCommunicationContractFail implements Action {
  readonly type = constants.LOAD_COMMUNICATION_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class LoadCommunicationContractSuccess implements Action {
  readonly type = constants.LOAD_COMMUNICATION_CONTRACT_SUCCESS;
  constructor(public payload: CommunicationContractModel) {}
}

// DELETE
export class DeleteCommunicationContract implements Action {
  readonly type = constants.DELETE_COMMUNICATION_CONTRACT;
  constructor(public payload: CommunicationContractModel) {}
}

export class DeleteCommunicationContractFail implements Action {
  readonly type = constants.DELETE_COMMUNICATION_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class DeleteCommunicationContractSuccess implements Action {
  readonly type = constants.DELETE_COMMUNICATION_CONTRACT_SUCCESS;
  constructor(public payload: CommunicationContractModel) {}
}

export class AddCommunicationContract implements Action {
  readonly type = constants.ADD_COMMUNICATION_CONTRACT;
  constructor(public payload: CommunicationContractModel) {}
}

export class AddCommunicationContractFail implements Action {
  readonly type = constants.ADD_COMMUNICATION_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class AddCommunicationContractSuccess implements Action {
  readonly type = constants.ADD_COMMUNICATION_CONTRACT_SUCCESS;
}

export class UpdateCommunicationContract implements Action {
  readonly type = constants.UPDATE_COMMUNICATION_CONTRACT;
  constructor(public payload: CommunicationContractModel) {}
}

export class UpdateCommunicationContractFail implements Action {
  readonly type = constants.UPDATE_COMMUNICATION_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateCommunicationContractSuccess implements Action {
  readonly type = constants.UPDATE_COMMUNICATION_CONTRACT_SUCCESS;
  constructor(public payload: CommunicationContractModel) {}
}

export class SetActiveCommunicationContract implements Action {
  readonly type = constants.SET_ACTIVE_COMMUNICATION_CONTRACT;
  constructor(public payload: CommunicationContractModel) {}
}

export class LoadCommunicationContractEmployee implements Action {
  readonly type = constants.LOAD_COMMUNICATION_CONTRACT_FARMER;
  constructor(public payload: number | string) {}
}

export class SetCommunicationContractEmployee implements Action {
  readonly type = constants.SET_COMMUNICATION_CONTRACT_FARMER;
  constructor(public payload: EmployeeModel) {}
}

export class ClearCommunicationContractEmployee implements Action {
  readonly type = constants.CLEAR_COMMUNICATION_CONTRACT_FARMER;
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
  | LoadCommunicationContracts
  | LoadCommunicationContractsFail
  | LoadCommunicationContractsSuccess
  | LoadCommunicationContract
  | LoadCommunicationContractFail
  | LoadCommunicationContractSuccess
  | AddCommunicationContract
  | AddCommunicationContractFail
  | AddCommunicationContractSuccess
  | UpdateCommunicationContract
  | UpdateCommunicationContractFail
  | UpdateCommunicationContractSuccess
  | DeleteCommunicationContract
  | DeleteCommunicationContractFail
  | DeleteCommunicationContractSuccess
  | SetActiveCommunicationContract
  | LoadCommunicationContractEmployee
  | SetCommunicationContractEmployee
  | ClearCommunicationContractEmployee
  | SetSearchTerms
  | ClearSearchTerms;
