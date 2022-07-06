import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromClass from '../reducers/class.reducer';

export const getClasses = createSelector(
  fromFeature.selectCoverFeatureState,
  (state: fromFeature.CoverFeatureState) => state.classes
);

export const selectClassesEntities = createSelector(
  getClasses,
  fromClass.selectClassEntities
);

export const selectClassesIds = createSelector(
  getClasses,
  fromClass.selectClassIds
);

export const selectAllClasses = createSelector(
  getClasses,
  fromClass.selectAllClasses
);

export const selectClassesTotal = createSelector(
  getClasses,
  fromClass.selectClassTotal
);

export const selectClassesLoaded = createSelector(
  getClasses,
  fromClass.selectClassesLoaded
);

export const selectClassesLoading = createSelector(
  getClasses,
  fromClass.selectClassesLoading
);

export const selectClassesPaginationInfo = createSelector(
  getClasses,
  fromClass.selectClassesPaginationInfo
);

export const selectClassesSearchTerms = createSelector(
  getClasses,
  fromClass.selectClassesSearchTerms
);

export const selectActiveClass = createSelector(
  getClasses,
  fromClass.selectActiveClass
);
