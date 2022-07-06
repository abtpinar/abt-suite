import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromFarmer from '../reducers/farmer.reducer';

export const getFarmers = createSelector(
  fromFeature.selectFarmersFeatureState,
  (state: fromFeature.FarmerFeatureState) => state.farmers
);

export const selectFarmersEntities = createSelector(
  getFarmers,
  fromFarmer.selectFarmerEntities
);

export const selectFarmersIds = createSelector(
  getFarmers,
  fromFarmer.selectFarmerIds
);

export const selectAllFarmers = createSelector(
  getFarmers,
  fromFarmer.selectAllFarmers
);

export const selectFarmersTotal = createSelector(
  getFarmers,
  fromFarmer.selectFarmerTotal
);

export const selectFarmersLoaded = createSelector(
  getFarmers,
  fromFarmer.selectFarmersLoaded
);

export const selectFarmersLoading = createSelector(
  getFarmers,
  fromFarmer.selectFarmersLoading
);

export const selectFarmersPaginationInfo = createSelector(
  getFarmers,
  fromFarmer.selectFarmersPaginationInfo
);

export const selectFarmersSearchTerms = createSelector(
  getFarmers,
  fromFarmer.selectFarmersSearchTerms
);

export const selectActiveFarmer = createSelector(
  getFarmers,
  fromFarmer.selectActiveFarmer
);
