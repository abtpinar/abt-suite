import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromFarm from '../reducers/farm.reducer';

export const getFarms = createSelector(
  fromFeature.selectFarmsFeatureState,
  (state: fromFeature.FarmFeatureState) => state.farms
);

export const selectFarmsEntities = createSelector(
  getFarms,
  fromFarm.selectFarmEntities
);

export const selectFarmsIds = createSelector(
  getFarms,
  fromFarm.selectFarmIds
);

export const selectAllFarms = createSelector(
  getFarms,
  fromFarm.selectAllFarms
);

export const selectFarmsTotal = createSelector(
  getFarms,
  fromFarm.selectFarmTotal
);

export const selectFarmsLoaded = createSelector(
  getFarms,
  fromFarm.selectFarmsLoaded
);

export const selectFarmsLoading = createSelector(
  getFarms,
  fromFarm.selectFarmsLoading
);

export const selectFarmsPaginationInfo = createSelector(
  getFarms,
  fromFarm.selectFarmsPaginationInfo
);

export const selectFarmsSearchTerms = createSelector(
  getFarms,
  fromFarm.selectFarmsSearchTerms
);

export const selectActiveFarms = createSelector(
  getFarms,
  fromFarm.selectActiveFarm
);

export const selectFarmFarmer = createSelector(
  getFarms,
  fromFarm.selectFarmFarmer
);
