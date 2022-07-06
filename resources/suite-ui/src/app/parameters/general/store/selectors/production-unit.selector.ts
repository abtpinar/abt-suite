import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProductionUnit from '../reducers/production-unit.reducer';

export const getProductionUnits = createSelector(
  fromFeature.selectCoverFeatureState,
  (state: fromFeature.GeneralFeatureState) => state.productionUnits
);

export const selectProductionUnitsEntities = createSelector(
  getProductionUnits,
  fromProductionUnit.selectProductionUnitEntities
);

export const selectProductionUnitsIds = createSelector(
  getProductionUnits,
  fromProductionUnit.selectProductionUnitIds
);

export const selectAllProductionUnits = createSelector(
  getProductionUnits,
  fromProductionUnit.selectAllProductionUnits
);

export const selectProductionUnitsTotal = createSelector(
  getProductionUnits,
  fromProductionUnit.selectProductionUnitTotal
);

export const selectProductionUnitsLoaded = createSelector(
  getProductionUnits,
  fromProductionUnit.selectProductionUnitsLoaded
);

export const selectProductionUnitsLoading = createSelector(
  getProductionUnits,
  fromProductionUnit.selectProductionUnitsLoading
);

export const selectProductionUnitsPaginationInfo = createSelector(
  getProductionUnits,
  fromProductionUnit.selectProductionUnitsPaginationInfo
);

export const selectProductionUnitsSearchTerms = createSelector(
  getProductionUnits,
  fromProductionUnit.selectProductionUnitsSearchTerms
);

export const selectActiveProductionUnit = createSelector(
  getProductionUnits,
  fromProductionUnit.selectActiveProductionUnit
);
