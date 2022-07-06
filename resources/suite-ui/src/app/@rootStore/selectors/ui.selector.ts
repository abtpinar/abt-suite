import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromUI from "../reducers/ui.reducer";

export const selectAppIsLoading = createSelector(
  fromFeature.selectUIState,
  fromUI.selectAppLoading
);

export const selectModalIsOpen = createSelector(
  fromFeature.selectUIState,
  fromUI.selectModalOpen
);
