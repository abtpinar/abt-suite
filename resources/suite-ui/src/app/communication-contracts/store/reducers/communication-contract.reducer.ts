import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/communication-contract.constant';
import * as actionCreators from '../actions/communication-contract.action';
import { CommunicationContractModel } from '../../models/communication-contract.model';
import { ServerPaginationInfo } from '../../../common/models/ServerPaginationInfo';
import {EmployeeModel} from '../../../employees/models/employee.model';

export interface State extends EntityState<CommunicationContractModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  activeCommunicationContract: CommunicationContractModel;
  contractEmployee: EmployeeModel;
}

export const adapter: EntityAdapter<CommunicationContractModel> = createEntityAdapter<CommunicationContractModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  activeCommunicationContract: null,
  contractEmployee: null
});

export function reducer(
  state = initialState,
  action: actionCreators.contractActions
) {
  switch (action.type) {

    case actionConstants.CLEAR_COMMUNICATION_CONTRACT_FARMER: {
      return { ...state, contractEmployee: null };
    }

    case actionConstants.ADD_COMMUNICATION_CONTRACT:
    case actionConstants.UPDATE_COMMUNICATION_CONTRACT:
    case actionConstants.DELETE_COMMUNICATION_CONTRACT:
    case actionConstants.LOAD_COMMUNICATION_CONTRACT:
    case actionConstants.LOAD_COMMUNICATION_CONTRACTS: {
      return { ...state, loading: true };
    }

    case actionConstants.ADD_COMMUNICATION_CONTRACT_FAIL:
    case actionConstants.UPDATE_COMMUNICATION_CONTRACT_FAIL:
    case actionConstants.DELETE_COMMUNICATION_CONTRACT_FAIL:
    case actionConstants.LOAD_COMMUNICATION_CONTRACT_FAIL:
    case actionConstants.LOAD_COMMUNICATION_CONTRACTS_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_COMMUNICATION_CONTRACTS_SUCCESS: {
      const serverResponse = action.payload;
      const { data, meta } = serverResponse.response;
      const { pagination: paginationInfo } = meta;
      return adapter.addAll(data, {
        ...state,
        loaded: true,
        loading: false,
        paginationInfo
      });
    }

    case actionConstants.DELETE_COMMUNICATION_CONTRACT_SUCCESS: {
      const deletedItem = action.payload;
      return adapter.removeOne(deletedItem.id, { ...state, loading: false });
    }

    case actionConstants.UPDATE_COMMUNICATION_CONTRACT_SUCCESS: {
      const updatedItem = action.payload;
      return adapter.updateOne(
        {
          id: updatedItem.id,
          changes: { ...updatedItem }
        },
        { ...state }
      );
    }

    case actionConstants.SET_ACTIVE_COMMUNICATION_CONTRACT:
    case actionConstants.LOAD_COMMUNICATION_CONTRACT_SUCCESS: {
      const activeCommunicationContract = action.payload;
      return { ...state, activeCommunicationContract };
    }

    case actionConstants.SET_COMMUNICATION_CONTRACT_FARMER: {
      const contractEmployee = action.payload;
      return { ...state, contractEmployee };
    }

    case actionConstants.SET_SEARCH_TERMS: {
      const searchTerms = action.payload;
      return { ...state, searchTerms };
    }

    case actionConstants.CLEAR_SEARCH_TERMS: {
      return { ...state, searchTerms: null };
    }

    default: {
      return state;
    }
  }
}

export const selectCommunicationContractsLoaded = (state: State) => state.loaded;
export const selectCommunicationContractsLoading = (state: State) => state.loading;
export const selectCommunicationContractsPaginationInfo = (state: State) => state.paginationInfo;
export const selectCommunicationContractsSearchTerms = (state: State) => state.searchTerms;
export const selectActiveCommunicationContract = (state: State) => state.activeCommunicationContract;

export const selectCommunicationContractEmployee = (state: State) => state.contractEmployee;

export const {
  selectIds: selectCommunicationContractIds,
  selectEntities: selectCommunicationContractEntities,
  selectAll: selectAllCommunicationContracts,
  selectTotal: selectCommunicationContractTotal
} = adapter.getSelectors();
