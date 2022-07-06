import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromClass from './class.reducer';

export interface CoverFeatureState {
  classes: fromClass.State;
}

export const reducers: ActionReducerMap<CoverFeatureState> = {
  classes: fromClass.reducer
};

export const selectCoverFeatureState = createFeatureSelector<CoverFeatureState>('coverFeatureState');
