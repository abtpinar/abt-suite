import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../../common/services/abstract-crud.service';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../../../common/services/navigation.service';
import { MobileModelModel } from "../models/mobile-model.model";

@Injectable({
  providedIn: 'root'
})
export class MobileModelsService extends AbstractCrudService<MobileModelModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): MobileModelModel {
    return <MobileModelModel>{};
  }

  protected get modelName(): string {
    return 'mobile-model';
  }

}
