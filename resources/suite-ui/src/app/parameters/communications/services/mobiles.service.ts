import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../../common/services/abstract-crud.service';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../../../common/services/navigation.service';
import { MobileModel } from "../models/mobile.model";

@Injectable({
  providedIn: 'root'
})
export class MobilesService extends AbstractCrudService<MobileModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): MobileModel {
    return <MobileModel>{};
  }

  protected get modelName(): string {
    return 'mobile';
  }

}
