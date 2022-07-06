import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromMobile from './mobile.reducer';
import * as fromSim from './sim.reducer';

export interface CommunicationFeatureState {
  mobiles: fromMobile.State;
  sims: fromSim.State;
}

export const reducers: ActionReducerMap<CommunicationFeatureState> = {
  mobiles: fromMobile.reducer,
  sims: fromSim.reducer
};

export const selectCommunicationsFeatureState = createFeatureSelector<CommunicationFeatureState>('communicationsFeatureState');
