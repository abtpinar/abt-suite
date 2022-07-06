import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import { ContractIrrigationScheduleModel } from '../models/contract-irrigation-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ContractIrrigationSchedulesService extends AbstractCrudService<ContractIrrigationScheduleModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): ContractIrrigationScheduleModel {
    return <ContractIrrigationScheduleModel>{};
  }

  protected get modelName(): string {
    return 'contract-irrigation-schedule';
  }

}
