import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../../common/services/abstract-crud.service';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../../../common/services/navigation.service';
import { ClassModel } from "../models/class.model";

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends AbstractCrudService<ClassModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
  ) {
    super(http, navigationService);
  }

  get newEntity(): ClassModel {
    return <ClassModel>{};
  }

  protected get modelName(): string {
    return 'tobacco-class';
  }

}
