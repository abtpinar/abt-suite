import {EventEmitter, Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import {ContractModel} from '../models/contract.model';
import {FileDownloadService} from 'src/app/common/services/file-download.service';
import {Observable} from 'rxjs';
import {numeric} from "@rxweb/reactive-form-validators/decorators/numeric.decorator";
import {ExportDocumentConfiguration} from "../../common/models/ExportDocumentConfiguration";

@Injectable({
  providedIn: 'root'
})
export class ContractsService extends AbstractCrudService<ContractModel> {
  isTP$ = new EventEmitter<boolean>();
  tobaccoType$= new EventEmitter<String>();
  ton$ = new EventEmitter<number>();
  constructor(
    http: HttpClient,
    navigationService: NavigationService,
    private fileDownloadService: FileDownloadService
  ) {
    super(http, navigationService);
  }

  get newEntity(): ContractModel {
    return <ContractModel>{
      state: 'DRAFT',
      contract_planting_schedules: {data: []},
      contract_irrigation_schedules: {data: []},
      contract_harvest_schedules: {data: []},
      contract_tobacco_class_schedules: {data: []},
      contract_products: {data: []}
    };
  }

  protected get modelName(): string {
    return 'contract';
  }

  downloadPDF(id): Observable<any> {
    let url = this.getModelUrl() + `download-pdf/${id}`;
    let mime = 'application/pdf';
    return this.fileDownloadService.downloadFile(url, 'contrato.pdf', mime);
  }

  downloadContractsValancePDF(): Observable<any> {
    let url = this.getModelUrl() + `contracts-download-pdf/valance`;
    let mime = 'application/pdf';
    return this.fileDownloadService.downloadFile(url, 'valance.pdf', mime);
  }


  public getExportConfiguration(mimeType: string, endUrl: string) {
    let url = this.getModelUrl().toString();
    url = url.substring(0, url.length - 1);
    const configuration: ExportDocumentConfiguration = {
      url: url + '/' + endUrl,
      fileName: 'Resultados.xlsx',
      mimeType: mimeType
    };
    return configuration;
  }

}
