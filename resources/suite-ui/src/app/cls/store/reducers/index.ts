import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCL from './cl.reducer';
import * as fromCLPayment from './cl-payment.reducer';

export interface CLFeatureState {
  cls: fromCL.State;
  clPayments: fromCLPayment.State;
}

export const reducers: ActionReducerMap<CLFeatureState> = {
  cls: fromCL.reducer,
  clPayments: fromCLPayment.reducer
};

export const selectCLsFeatureState = createFeatureSelector<
  CLFeatureState
>('clsFeatureState');
