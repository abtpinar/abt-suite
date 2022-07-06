import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCL from '../reducers/cl.reducer';

export const getCLs = createSelector(
  fromFeature.selectCLsFeatureState,
  (state: fromFeature.CLFeatureState) => state.cls
);

export const selectCLsEntities = createSelector(
  getCLs,
  fromCL.selectCLEntities
);

export const selectCLsIds = createSelector(
  getCLs,
  fromCL.selectCLIds
);

export const selectAllCLs = createSelector(
  getCLs,
  fromCL.selectAllCLs
);

export const selectCLsTotal = createSelector(
  getCLs,
  fromCL.selectCLTotal
);

export const selectCLsLoaded = createSelector(
  getCLs,
  fromCL.selectCLsLoaded
);

export const selectCLsLoading = createSelector(
  getCLs,
  fromCL.selectCLsLoading
);

export const selectCLsPaginationInfo = createSelector(
  getCLs,
  fromCL.selectCLsPaginationInfo
);

export const selectCLsSearchTerms = createSelector(
  getCLs,
  fromCL.selectCLsSearchTerms
);

export const selectCLsProcessing = createSelector(
  getCLs,
  fromCL.selectCLsProcessing
);

export const selectActiveCls = createSelector(
  getCLs,
  fromCL.selectActiveCls
);

