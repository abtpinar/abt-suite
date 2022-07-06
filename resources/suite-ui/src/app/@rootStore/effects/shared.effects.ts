import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as sharedActions from '../actions/shared.action';

import {FileDownloadService} from 'src/app/common/services/file-download.service';
import {NotificationService} from 'src/app/common/services/notification.service';
import {LanguageService} from 'src/app/i18n/services/language.service';

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private fileDownloadService: FileDownloadService,
    private notificationService: NotificationService,
    private languageService: LanguageService
  ) {}

  @Effect()
  downloadFile$ = this.actions$.pipe(
    ofType(sharedActions.DOWNLOAD_FILE),
    map((action: sharedActions.DownloadFile) => action.payload),
    switchMap(({ downloadUrl, fileName, mimeType, searchTerms }) => {
      return this.fileDownloadService
        .downloadFile(downloadUrl, fileName, mimeType, searchTerms)
        .pipe(
          map(res => new sharedActions.DownloadFileSuccess()),
          catchError(error => {
            console.error('FILE DOWNLOAD ERROR:', error);
            return of(new sharedActions.DownloadFileFail(error));
          })
        );
    })
  );

  @Effect()
  uploadFile$ = this.actions$.pipe(
    ofType(sharedActions.UPLOAD_FILES),
    map((action: sharedActions.UploadFiles) => action.payload),
    switchMap(({ files, uploadUrl }) => {
      return this.fileDownloadService.uploadFiles(uploadUrl, files).pipe(
        map(res => new sharedActions.UploadFilesSuccess()),
        catchError(error => {
          console.error('FILE UPLOAD ERROR:', error);
          return of(new sharedActions.UploadFilesFail(error));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  downloadFileFailed$ = this.actions$
    .ofType(sharedActions.DOWNLOAD_FILE_FAIL)
    .pipe(
      map(() =>
        this.notificationService.showError(
          this.languageService.translate('file-download.failure')
        )
      )
    );

  @Effect({ dispatch: false })
  uploadFilesFailed$ = this.actions$
    .ofType(sharedActions.UPLOAD_FILES_FAIL)
    .pipe(
      map(() =>
        this.notificationService.showError(
          this.languageService.translate('file-upload.failure')
        )
      )
    );

  @Effect({ dispatch: false })
  notifyUploadSuccess$ = this.actions$.pipe(
    ofType(sharedActions.UPLOAD_FILES_SUCCESS),
    map(() =>
      this.notificationService.showSuccess(
        this.languageService.translate('file-upload.success')
      )
    )
  );
}
