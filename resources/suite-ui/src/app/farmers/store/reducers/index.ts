import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromFarmer from './farmer.reducer';

export interface FarmerFeatureState {
  farmers: fromFarmer.State;
}

export const reducers: ActionReducerMap<FarmerFeatureState> = {
  farmers: fromFarmer.reducer
};

export const selectFarmersFeatureState = createFeatureSelector<
  FarmerFeatureState
>('farmersFeatureState');
