import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../../common/services/abstract-crud.service';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../../../common/services/navigation.service';
import { SimModel } from "../models/sim.model";

@Injectable({
  providedIn: 'root'
})
export class SimsService extends AbstractCrudService<SimModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): SimModel {
    return <SimModel>{};
  }

  protected get modelName(): string {
    return 'sim';
  }

}
