import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import {CLModel} from "../models/cl.model";
import { ExportDocumentConfiguration } from 'src/app/common/models/ExportDocumentConfiguration';
import { FileDownloadService } from 'src/app/common/services/file-download.service';

@Injectable({
  providedIn: 'root'
})
export class CLsService extends AbstractCrudService<CLModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
    private fileDownloadService: FileDownloadService
  ) {
    super(http, navigationService);
  }

  get newEntity(): CLModel {
    return <CLModel>{picture: null};
  }

  protected get modelName(): string {
    return 'cl';
  }

  processSelectedCLs(ids: string[]) {
    const queryString = '?ids=' + ids.join(',');
    return this.http.get(`${this.apiUrl}/cls/process${queryString}`);
  }

  public setExpense(data: any) {
    const url = `${this.modelName}s/set-expense`;
    return this.post(url, data);
  }

  public setPayment(data: any) {
    const url = `${this.modelName}s/set-payment`;
    return this.post(url, data);
  }

  updateFromSIPAC() {
    return this.http.get(`${this.apiUrl}/cls/update-sipac`);
  }

  getUnits() {
    return this.http.get(`${this.apiUrl}/cls/get-units`);
  }

  public getExportConfiguration(mimeType: string, endUrl: string) {
    let url = this.getModelUrl().toString();
    url = url.substring(0, url.length - 1);
    const configuration: ExportDocumentConfiguration = {
      url: url + 's/' + endUrl,
      fileName: 'Resultados',
      mimeType: mimeType
    };
    return configuration;
  }

  getOverview() {
    return this.http.get(`${this.apiUrl}/cls/overview`);
  }

  downloadPDF() {
    let url = this.getModelUrl().toString();
    url = url.substring(0, url.length - 1);
    let mime = 'application/pdf';
    return this.fileDownloadService.downloadFile(`${url}s/download-pdf`, 'balance.pdf', mime);
  }

}
