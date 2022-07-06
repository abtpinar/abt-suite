import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromFarm from './farm.reducer';

export interface FarmFeatureState {
  farms: fromFarm.State;
}

export const reducers: ActionReducerMap<FarmFeatureState> = {
  farms: fromFarm.reducer
};

export const selectFarmsFeatureState = createFeatureSelector<
  FarmFeatureState
>('farmsFeatureState');
