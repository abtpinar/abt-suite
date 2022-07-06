import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../../common/services/abstract-crud.service';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../../../common/services/navigation.service';
import { ProductionUnitModel } from "../models/production-unit.model";

@Injectable({
  providedIn: 'root'
})
export class ProductionUnitsService extends AbstractCrudService<ProductionUnitModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): ProductionUnitModel {
    return <ProductionUnitModel>{};
  }

  protected get modelName(): string {
    return 'production-unit';
  }

}
