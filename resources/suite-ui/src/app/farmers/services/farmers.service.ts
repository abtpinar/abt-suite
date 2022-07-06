import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import {FarmerModel} from "../models/farmer.model";
import {Observable} from "rxjs/index";
import {FileDownloadService} from "../../common/services/file-download.service";

@Injectable({
  providedIn: 'root'
})
export class FarmersService extends AbstractCrudService<FarmerModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
    private fileDownloadServcie: FileDownloadService
  ) {
    super(http, navigationService);
  }

  get newEntity(): FarmerModel {
    return <FarmerModel>{picture: null};
  }

  protected get modelName(): string {
    return 'farmer';
  }

  downloadPDF(id): Observable<any> {
    let url = this.getModelUrl() + `download-contracts-pdf/${id}`;
    let mime = 'application/pdf';
    return this.fileDownloadServcie.downloadFile(url, 'farmer-contracts.pdf', mime);
  }

}
