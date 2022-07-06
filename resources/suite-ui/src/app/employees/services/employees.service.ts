import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import {EmployeeModel} from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends AbstractCrudService<EmployeeModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): EmployeeModel {
    return <EmployeeModel>{picture: null};
  }

  protected get modelName(): string {
    return 'employee';
  }

}
