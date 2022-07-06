import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import {CommunicationContractModel} from "../models/communication-contract.model";

@Injectable({
  providedIn: 'root'
})
export class CommunicationContractsService extends AbstractCrudService<CommunicationContractModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): CommunicationContractModel {
    return <CommunicationContractModel>{picture: null};
  }

  protected get modelName(): string {
    return 'communication-contract';
  }

}
