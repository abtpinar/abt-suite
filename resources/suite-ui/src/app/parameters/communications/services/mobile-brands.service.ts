import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../../common/services/abstract-crud.service';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../../../common/services/navigation.service';
import { MobileBrandModel } from "../models/mobile-brand.model";

@Injectable({
  providedIn: 'root'
})
export class MobileBrandsService extends AbstractCrudService<MobileBrandModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): MobileBrandModel {
    return <MobileBrandModel>{};
  }

  protected get modelName(): string {
    return 'mobile-brand';
  }

}
