import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import { Observable } from 'rxjs';
import {FarmModel} from '../models/farm.model';
import {FileDownloadService} from '../../common/services/file-download.service';

@Injectable({
  providedIn: 'root'
})
export class FarmsService extends AbstractCrudService<FarmModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
    private fileDownloadService: FileDownloadService
  ) {
    super(http, navigationService);
  }

  get newEntity(): FarmModel {
    return <FarmModel>{
      allotments: {data: []}
    };
  }

  protected get modelName(): string {
    return 'farm';
  }

  /*downloadPDF(id): Observable<any> {
    let url = this.getModelUrl() + `download-pdf/${id}`;
    let mime = 'application/pdf';
    return this.fileDownloadService.downloadFile(url, 'contrato.pdf', mime);
  }*/

}
