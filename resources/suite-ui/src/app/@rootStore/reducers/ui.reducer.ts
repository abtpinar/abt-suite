import * as fromUI from "../actions/ui.action";

export interface UIState {
  appLoading: boolean;
  modalOpen: boolean;
}

export const initialState: UIState = {
  appLoading: false,
  modalOpen: false
};

export function reducer(state = initialState, action: fromUI.UIActions) {
  switch (action.type) {
    case fromUI.SHOW_LOADER: {
      return {
        ...state,
        appLoading: true
      };
    }

    case fromUI.HIDE_LOADER: {
      return {
        ...state,
        appLoading: false
      };
    }

    case fromUI.OPEN_MODAL: {
      return { ...state, modalOpen: true };
    }

    case fromUI.CLOSE_MODAL: {
      return { ...state, modalOpen: false };
    }

    default: {
      return state;
    }
  }
}

export const selectAppLoading = (state: UIState) => state.appLoading;
export const selectModalOpen = (state: UIState) => state.modalOpen;
