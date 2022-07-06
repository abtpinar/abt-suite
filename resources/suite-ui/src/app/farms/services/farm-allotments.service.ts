import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import { FarmAllotmentModel } from '../models/farm-allotment.model';

@Injectable({
  providedIn: 'root'
})
export class FarmAllotmentsService extends AbstractCrudService<FarmAllotmentModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): FarmAllotmentModel {
    return <FarmAllotmentModel>{};
  }

  protected get modelName(): string {
    return 'allotment';
  }

}
