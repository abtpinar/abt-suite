import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import { ContractPlantingScheduleModel } from '../models/contract-planting-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ContractPlantingSchedulesService extends AbstractCrudService<ContractPlantingScheduleModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): ContractPlantingScheduleModel {
    return <ContractPlantingScheduleModel>{};
  }

  protected get modelName(): string {
    return 'contract-planting-schedule';
  }

}
