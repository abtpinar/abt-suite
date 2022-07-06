import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromContract from '../reducers/contract.reducer';

export const getContracts = createSelector(
  fromFeature.selectContractsFeatureState,
  (state: fromFeature.ContractFeatureState) => state.contracts
);

export const selectContractsEntities = createSelector(
  getContracts,
  fromContract.selectContractEntities
);

export const selectContractsIds = createSelector(
  getContracts,
  fromContract.selectContractIds
);

export const selectAllContracts = createSelector(
  getContracts,
  fromContract.selectAllContracts
);

export const selectContractsTotal = createSelector(
  getContracts,
  fromContract.selectContractTotal
);

export const selectContractsLoaded = createSelector(
  getContracts,
  fromContract.selectContractsLoaded
);

export const selectContractsLoading = createSelector(
  getContracts,
  fromContract.selectContractsLoading
);

export const selectContractsPaginationInfo = createSelector(
  getContracts,
  fromContract.selectContractsPaginationInfo
);

export const selectContractsSearchTerms = createSelector(
  getContracts,
  fromContract.selectContractsSearchTerms
);

export const selectActiveContract = createSelector(
  getContracts,
  fromContract.selectActiveContract
);

export const selectContractFarmer = createSelector(
  getContracts,
  fromContract.selectContractFarmer
);
