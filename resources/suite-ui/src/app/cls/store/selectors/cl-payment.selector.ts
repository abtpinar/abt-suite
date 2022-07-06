import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCLPayment from '../reducers/cl-payment.reducer';

export const getCLPayments = createSelector(
  fromFeature.selectCLsFeatureState,
  (state: fromFeature.CLFeatureState) => state.clPayments
);

export const selectCLPaymentsEntities = createSelector(
  getCLPayments,
  fromCLPayment.selectCLPaymentEntities
);

export const selectCLPaymentsIds = createSelector(
  getCLPayments,
  fromCLPayment.selectCLPaymentIds
);

export const selectAllCLPayments = createSelector(
  getCLPayments,
  fromCLPayment.selectAllCLPayments
);

export const selectCLPaymentsTotal = createSelector(
  getCLPayments,
  fromCLPayment.selectCLPaymentTotal
);

export const selectCLPaymentsLoaded = createSelector(
  getCLPayments,
  fromCLPayment.selectCLPaymentsLoaded
);

export const selectCLPaymentsLoading = createSelector(
  getCLPayments,
  fromCLPayment.selectCLPaymentsLoading
);

export const selectCLPaymentsPaginationInfo = createSelector(
  getCLPayments,
  fromCLPayment.selectCLPaymentsPaginationInfo
);

export const selectCLPaymentsSearchTerms = createSelector(
  getCLPayments,
  fromCLPayment.selectCLPaymentsSearchTerms
);
