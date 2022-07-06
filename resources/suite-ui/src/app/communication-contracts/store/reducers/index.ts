import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCommunicationContract from './communication-contract.reducer';

export interface CommunicationContractFeatureState {
  contracts: fromCommunicationContract.State;
}

export const reducers: ActionReducerMap<CommunicationContractFeatureState> = {
  contracts: fromCommunicationContract.reducer
};

export const selectCommunicationContractsFeatureState = createFeatureSelector<
  CommunicationContractFeatureState
>('communicationContractsFeatureState');
