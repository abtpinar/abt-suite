import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSim from '../reducers/sim.reducer';

export const getSims = createSelector(
  fromFeature.selectCommunicationsFeatureState,
  (state: fromFeature.CommunicationFeatureState) => state.sims
);

export const selectSimsEntities = createSelector(
  getSims,
  fromSim.selectSimEntities
);

export const selectSimsIds = createSelector(
  getSims,
  fromSim.selectSimIds
);

export const selectAllSims = createSelector(
  getSims,
  fromSim.selectAllSims
);

export const selectSimsTotal = createSelector(
  getSims,
  fromSim.selectSimTotal
);

export const selectSimsLoaded = createSelector(
  getSims,
  fromSim.selectSimsLoaded
);

export const selectSimsLoading = createSelector(
  getSims,
  fromSim.selectSimsLoading
);

export const selectSimsPaginationInfo = createSelector(
  getSims,
  fromSim.selectSimsPaginationInfo
);

export const selectSimsSearchTerms = createSelector(
  getSims,
  fromSim.selectSimsSearchTerms
);

export const selectActiveSim = createSelector(
  getSims,
  fromSim.selectActiveSim
);
