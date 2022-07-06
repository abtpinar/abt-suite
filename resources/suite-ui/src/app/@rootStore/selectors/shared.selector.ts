import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromShared from '../reducers/shared.reducer';

export const selectUploadInProgress = createSelector(
  fromFeature.selectSharedState,
  fromShared.getUploadInProgress
);

export const selectDownloadInProgress = createSelector(
  fromFeature.selectSharedState,
  fromShared.getDownloadInProgress
);
