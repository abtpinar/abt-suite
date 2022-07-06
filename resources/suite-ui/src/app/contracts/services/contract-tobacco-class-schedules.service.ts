import {EventEmitter, Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import {ContractTobaccoClassScheduleModel} from '../models/contract-tobacco-class-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ContractTobaccoClassSchedulesService extends AbstractCrudService<ContractTobaccoClassScheduleModel> {
  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): ContractTobaccoClassScheduleModel {
    return <ContractTobaccoClassScheduleModel>{};
  }

  protected get modelName(): string {
    return 'contract-tobacco-class-schedule';
  }

}
