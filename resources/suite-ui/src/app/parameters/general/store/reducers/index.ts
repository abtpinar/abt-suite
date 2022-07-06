import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromProductionUnit from './production-unit.reducer';

export interface GeneralFeatureState {
  productionUnits: fromProductionUnit.State;
}

export const reducers: ActionReducerMap<GeneralFeatureState> = {
  productionUnits: fromProductionUnit.reducer
};

export const selectCoverFeatureState = createFeatureSelector<GeneralFeatureState>('generalFeatureState');
