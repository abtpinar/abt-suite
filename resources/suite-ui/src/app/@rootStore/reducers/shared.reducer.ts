import * as fromShared from '../actions/shared.action';

export interface SharedState {
  uploadInProgress: boolean;
  downloadInProgress: boolean;
}

export const initialState: SharedState = {
  uploadInProgress: false,
  downloadInProgress: false
};

export function reducer(
  state = initialState,
  action: fromShared.SharedActions
): SharedState {
  switch (action.type) {
    case fromShared.DOWNLOAD_FILE: {
      return { ...state, downloadInProgress: true };
    }

    case fromShared.DOWNLOAD_FILE_FAIL:
    case fromShared.DOWNLOAD_FILE_SUCCESS: {
      return { ...state, downloadInProgress: false };
    }

    case fromShared.UPLOAD_FILES: {
      return { ...state, uploadInProgress: true };
    }

    case fromShared.UPLOAD_FILES_FAIL:
    case fromShared.UPLOAD_FILES_SUCCESS: {
      return { ...state, uploadInProgress: false };
    }

    default: {
      return state;
    }
  }
}

export const getUploadInProgress = (state: SharedState) =>
  state.uploadInProgress;
export const getDownloadInProgress = (state: SharedState) =>
  state.downloadInProgress;
