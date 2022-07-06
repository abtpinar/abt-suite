import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMobile from '../reducers/mobile.reducer';

export const getMobiles = createSelector(
  fromFeature.selectCommunicationsFeatureState,
  (state: fromFeature.CommunicationFeatureState) => state.mobiles
);

export const selectMobilesEntities = createSelector(
  getMobiles,
  fromMobile.selectMobileEntities
);

export const selectMobilesIds = createSelector(
  getMobiles,
  fromMobile.selectMobileIds
);

export const selectAllMobiles = createSelector(
  getMobiles,
  fromMobile.selectAllMobiles
);

export const selectMobilesTotal = createSelector(
  getMobiles,
  fromMobile.selectMobileTotal
);

export const selectMobilesLoaded = createSelector(
  getMobiles,
  fromMobile.selectMobilesLoaded
);

export const selectMobilesLoading = createSelector(
  getMobiles,
  fromMobile.selectMobilesLoading
);

export const selectMobilesPaginationInfo = createSelector(
  getMobiles,
  fromMobile.selectMobilesPaginationInfo
);

export const selectMobilesSearchTerms = createSelector(
  getMobiles,
  fromMobile.selectMobilesSearchTerms
);

export const selectActiveMobile = createSelector(
  getMobiles,
  fromMobile.selectActiveMobile
);
