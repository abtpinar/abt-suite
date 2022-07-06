import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import {CLPaymentModel} from "../models/cl-payment.model";
import { ExportDocumentConfiguration } from 'src/app/common/models/ExportDocumentConfiguration';

@Injectable({
  providedIn: 'root'
})
export class CLPaymentsService extends AbstractCrudService<CLPaymentModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): CLPaymentModel {
    return <CLPaymentModel>{};
  }

  protected get modelName(): string {
    return 'cl-payment';
  }

  public getExportConfiguration(mimeType: string, endUrl: string) {
    let url = this.getModelUrl().toString();
    url = url.substring(0, url.length - 1);
    const configuration: ExportDocumentConfiguration = {
      url: url + 's/' + endUrl,
      fileName: 'Pago',
      mimeType: mimeType
    };
    return configuration;
  }

}
