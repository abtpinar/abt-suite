import { Injectable } from '@angular/core';
import { TableCode } from '../models/table-code.model';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from './navigation.service';
import { AbstractApiBaseService } from './abstract-api-base.service';

enum TableKeys {
  Units = 'units',
  UEBs = 'uebs',
  TobaccoFamilies = 'tobacco_families',
  TobaccoType = 'tobacco_type',
  CureTechnologies = 'cure_technologies',
  PlantingTypes = 'planting_types',
  PropertyTypes = 'property_types',
  Departments = 'departments',
  Occupations = 'occupations',
  ClassesTypes = 'classes_types',
  RefundMotives = 'refund_motives',
  PossesionTypes = 'possesion_types',
  GroundFeatures = 'ground_features',
  UsageTypes = 'usage_types',
  ProductCategories = 'product_categories',
}

@Injectable({
  providedIn: 'root'
})
export class CodeTablesService extends AbstractApiBaseService {
  constructor(http: HttpClient, navigationService: NavigationService) {
    super(http, navigationService);
  }

  get availableTableKeys() {
    return TableKeys;
  }

  getCodeTableByKey<T = TableCode>(key: TableKeys) {
    return this.get<T>(`code_tables/${key}`);
  }

  getCombinedTablesByKeys(keys: TableKeys[]) {
    const queryString = `keys=${keys.join(',')}`;
    return this.basicGet<{
      combinedTableCodes: { [key: string]: TableCode[] };
    }>(`code_tables/combined?${queryString}`);
  }
}
