import {Action} from '@ngrx/store';

// DOWNLOAD FILE
export const DOWNLOAD_FILE = '[Shared] Download File';
export const DOWNLOAD_FILE_FAIL = '[Shared] Download File Fail';
export const DOWNLOAD_FILE_SUCCESS = '[Shared] Download File Success';

// UPLOAD FILE
export const UPLOAD_FILES = '[Shared] Upload File';
export const UPLOAD_FILES_FAIL = '[Shared] Upload File Fail';
export const UPLOAD_FILES_SUCCESS = '[Shared] Upload File Success';

export class DownloadFile implements Action {
  readonly type = DOWNLOAD_FILE;
  constructor(
    public payload: { downloadUrl: string; fileName: string; mimeType: string, searchTerms?: any }
  ) {}
}

export class DownloadFileFail implements Action {
  readonly type = DOWNLOAD_FILE_FAIL;
  constructor(public payload: any) {}
}

export class DownloadFileSuccess implements Action {
  readonly type = DOWNLOAD_FILE_SUCCESS;
}

export class UploadFiles implements Action {
  readonly type = UPLOAD_FILES;
  constructor(
    public payload: { uploadUrl: string; files: { [key: string]: File } }
  ) {}
}

export class UploadFilesFail implements Action {
  readonly type = UPLOAD_FILES_FAIL;
  constructor(public payload: any) {}
}

export class UploadFilesSuccess implements Action {
  readonly type = UPLOAD_FILES_SUCCESS;
}

export type SharedActions =
  | DownloadFile
  | DownloadFileFail
  | DownloadFileSuccess
  | UploadFiles
  | UploadFilesFail
  | UploadFilesSuccess;
