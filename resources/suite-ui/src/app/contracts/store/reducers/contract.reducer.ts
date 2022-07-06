import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

import * as actionConstants from '../constants/contract.constant';
import * as actionCreators from '../actions/contract.action';
import {ContractModel} from '../../models/contract.model';
import {ServerPaginationInfo} from '../../../common/models/ServerPaginationInfo';
import {FarmerModel} from '../../../farmers/models/farmer.model';

export interface State extends EntityState<ContractModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  activeContract: ContractModel;
  contractFarmer: FarmerModel;
}

export const adapter: EntityAdapter<ContractModel> = createEntityAdapter<ContractModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  activeContract: null,
  contractFarmer: null
});

export function reducer(
  state = initialState,
  action: actionCreators.contractActions
) {
  switch (action.type) {

    case actionConstants.ADD_CONTRACT:
    case actionConstants.ADD_CONTRACT_AND_CONTINUE:
    case actionConstants.UPDATE_CONTRACT:
    case actionConstants.DELETE_CONTRACT:
    case actionConstants.LOAD_CONTRACT:
    case actionConstants.LOAD_CONTRACTS: {
      return {...state, loading: true};
    }

    case actionConstants.ADD_CONTRACT_AND_CONTINUE_SUCCESS: {
      return {...state, loading: false};
    }

    case actionConstants.ADD_CONTRACT_FAIL:
    case actionConstants.UPDATE_CONTRACT_FAIL:
    case actionConstants.DELETE_CONTRACT_FAIL:
    case actionConstants.LOAD_CONTRACT_FAIL:
    case actionConstants.LOAD_CONTRACTS_FAIL: {
      const error = action.payload;
      return {...state, error, loading: false};
    }

  case actionConstants.LOAD_CONTRACTS_SUCCESS: {
      const serverResponse = action.payload;
      const {data, meta} = serverResponse.response;
      const {pagination: paginationInfo} = meta;
      return adapter.addAll(data, {
        ...state,
        loaded: true,
        loading: false,
        paginationInfo
      });
    }

    case actionConstants.DELETE_CONTRACT_SUCCESS: {
      const deletedItem = action.payload;
      return adapter.removeOne(deletedItem.id, {...state, loading: false});
    }

    case actionConstants.UPDATE_CONTRACT_SUCCESS: {
      const updatedItem = action.payload;
      return adapter.updateOne(
        {
          id: updatedItem.id,
          changes: {...updatedItem}
        },
        {...state}
      );
    }

    case actionConstants.SET_ACTIVE_CONTRACT:
    case actionConstants.LOAD_CONTRACT_SUCCESS: {
      const activeContract = action.payload;
      return {...state, activeContract};
    }

    case actionConstants.SET_CONTRACT_FARMER: {
      const contractFarmer = action.payload;
      return {...state, contractFarmer};
    }

    case actionConstants.SET_SEARCH_TERMS: {
      const searchTerms = action.payload;
      return {...state, searchTerms};
    }

    case actionConstants.CLEAR_SEARCH_TERMS: {
      return {...state, searchTerms: null};
    }

    default: {
      return state;
    }
  }
}

export const selectContractsLoaded = (state: State) => state.loaded;
export const selectContractsLoading = (state: State) => state.loading;
export const selectContractsPaginationInfo = (state: State) => state.paginationInfo;
export const selectContractsSearchTerms = (state: State) => state.searchTerms;
export const selectActiveContract = (state: State) => state.activeContract;

export const selectContractFarmer = (state: State) => state.contractFarmer;

export const {
  selectIds: selectContractIds,
  selectEntities: selectContractEntities,
  selectAll: selectAllContracts,
  selectTotal: selectContractTotal
} = adapter.getSelectors();
