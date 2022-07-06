import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCommunicationContract from '../reducers/communication-contract.reducer';

export const getCommunicationContracts = createSelector(
  fromFeature.selectCommunicationContractsFeatureState,
  (state: fromFeature.CommunicationContractFeatureState) => state.contracts
);

export const selectCommunicationContractsEntities = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectCommunicationContractEntities
);

export const selectCommunicationContractsIds = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectCommunicationContractIds
);

export const selectAllCommunicationContracts = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectAllCommunicationContracts
);

export const selectCommunicationContractsTotal = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectCommunicationContractTotal
);

export const selectCommunicationContractsLoaded = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectCommunicationContractsLoaded
);

export const selectCommunicationContractsLoading = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectCommunicationContractsLoading
);

export const selectCommunicationContractsPaginationInfo = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectCommunicationContractsPaginationInfo
);

export const selectCommunicationContractsSearchTerms = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectCommunicationContractsSearchTerms
);

export const selectActiveCommunicationContract = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectActiveCommunicationContract
);

export const selectCommunicationContractEmployee = createSelector(
  getCommunicationContracts,
  fromCommunicationContract.selectCommunicationContractEmployee
);
