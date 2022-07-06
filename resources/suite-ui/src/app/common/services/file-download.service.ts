import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient) { }

  downloadFile(
    downloadUrl: string,
    filename: string,
    mimetype?: string,
    searchTerms?: any
  ) {

    return this.http
      .get<Blob>(downloadUrl, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        params: searchTerms,
        responseType: 'blob' as 'json',
        observe: 'response',
      })
      .pipe(
        map(response => {
          console.log('RESPONSE', response);
          const blob = new Blob([response.body], { type: mimetype ? mimetype : response.body.type });
          var disposition = response.headers.get('Content-Disposition');
          if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
              filename = matches[1].replace(/['"]/g, '');
            }
          }

          if (blob.size != 0) {
            saveAs(blob, filename);
            return true;
          } else return false;
        })
      );
  }

  downloadFilePost(
    downloadUrl: string,
    filename: string,
    mimetype?: string,
    params?: FormData
  ) {

    return this.http
      .post<Blob>(downloadUrl, params, {
        responseType: 'blob' as 'json',
        observe: 'response',
      }).pipe(
        map((response) => {
          console.log('Response Download file report::', response);
          const blob = new Blob([response.body], { type: mimetype ? mimetype : response.body.type });
          var disposition = response.headers.get('Content-Disposition');
          if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
              filename = matches[1].replace(/['"]/g, '');
            }
          }

          if (blob.size != 0) {
            saveAs(blob, filename);
            return true;
          } else return false;
        }),
        catchError(err => {
          return of(err)
        })
      )

  }

  getExtensionFromMimeType(mimetype: string) {
    return mimetype.split('/')[1];
  }

  uploadFiles(uploadUrl: string, data: { [key: string]: File }) {
    let formData: FormData = new FormData();
    let props = Object.keys(data);
    props.forEach(prop => {
      formData.append(prop, data[prop]);
    });
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${uploadUrl}`, formData, { headers });
  }
}
