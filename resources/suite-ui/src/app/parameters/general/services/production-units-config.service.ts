import { Injectable } from '@angular/core';
import { BaseTableFilterFactoryService } from '../../../common/services/base-table-filter-factory.service';
import { LanguageService } from '../../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../../common/components/base-table/base-table-config';
import { ContractsConfigService } from 'src/app/contracts/services/contracts-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductionUnitsConfigService {

  constructor(
    private filterFactory: BaseTableFilterFactoryService
  ) {
    this.init();
  }

  init() {
    const selectFilters = {
      unit: {
        text: 'production-units-page.unit.unit',
        placeholder: 'production-units-page.unit.unit'
      }
    };
    this.filterFactory.addFiltersDataToCache(selectFilters);
  }

  getListColumns(types = []): Column[] {
    return [
      {
        fieldI18nKey: 'production-units-page.unit.code',
        field: 'code',
        sortable: true,
        sortFieldName: 'production_units.code'
      },
      {
        fieldI18nKey: 'production-units-page.unit.name',
        field: 'name',
        sortable: true,
        sortFieldName: 'production_units.name'
      },
      {
        fieldI18nKey: 'production-units-page.unit.address',
        field: 'address',
        sortable: true,
        sortFieldName: 'production_units.address'
      },
      {
        fieldI18nKey: 'production-units-page.unit.president_name',
        field: 'president_name',
        sortable: true,
        sortFieldName: 'production_units.president_name'
      },
      {
        fieldI18nKey: 'production-units-page.unit.bank_account',
        field: 'bank_account',
        sortable: true,
        sortFieldName: 'production_units.bank_account'
      }
    ];
  }

  getListFilters(): FiltersConfiguration {
    return {
      filters: [
        {
          type: FILTER_TYPE.TEXT,
          field: 'code',
          class: 'col-sm-3',
          textI18n: 'production-units-page.unit.code',
          placeholderI18n: 'production-units-page.unit.code'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'name',
          class: 'col-sm-3',
          textI18n: 'production-units-page.unit.name',
          placeholderI18n: 'production-units-page.unit.name'
        }
      ]
    };
  }

}
