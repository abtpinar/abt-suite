import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import { ContractHarvestScheduleModel } from '../models/contract-harvest-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ContractHarvestSchedulesService extends AbstractCrudService<ContractHarvestScheduleModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): ContractHarvestScheduleModel {
    return <ContractHarvestScheduleModel>{};
  }

  protected get modelName(): string {
    return 'contract-harvest-schedule';
  }

}
