import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import { ContractProductModel } from '../models/contract-product.model';

@Injectable({
  providedIn: 'root'
})
export class ContractProductsService extends AbstractCrudService<ContractProductModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): ContractProductModel {
    return <ContractProductModel>{};
  }

  protected get modelName(): string {
    return 'contract-product';
  }

}
