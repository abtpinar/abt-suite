import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromContract from './contract.reducer';

export interface ContractFeatureState {
  contracts: fromContract.State;
}

export const reducers: ActionReducerMap<ContractFeatureState> = {
  contracts: fromContract.reducer
};

export const selectContractsFeatureState = createFeatureSelector<
  ContractFeatureState
>('contractsFeatureState');
