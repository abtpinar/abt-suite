import { Injectable } from '@angular/core';
import { BaseTableFilterFactoryService } from '../../../common/services/base-table-filter-factory.service';
import { LanguageService } from '../../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../../common/components/base-table/base-table-config';
import { SimModel } from '../models/sim.model';
import { ContractsConfigService } from 'src/app/contracts/services/contracts-config.service';
import { formatDecimal, parseDateFromString } from 'src/app/common/components/formats';

@Injectable({
  providedIn: 'root'
})
export class SimsConfigService {

  constructor(
    private filterFactory: BaseTableFilterFactoryService,
    private languageService: LanguageService,
    private contractsConfigService: ContractsConfigService,
  ) {
    this.init();
  }

  init() {
    const selectFilters = {
      unit: {
        text: 'sims-page.sim.unit',
        placeholder: 'sims-page.sim.unit'
      }
    };
    this.filterFactory.addFiltersDataToCache(selectFilters);
  }

  getListColumns(units = []): Column[] {
    return [
      {
        fieldI18nKey: 'sims-page.sim.number',
        field: 'number',
        sortable: true,
        sortFieldName: 'sims.number'
      },
      {
        fieldI18nKey: 'sims-page.sim.pin',
        field: 'pin',
        sortable: true,
        sortFieldName: 'sims.pin'
      },
      {
        fieldI18nKey: 'sims-page.sim.puk',
        field: 'puk',
        sortable: true,
        sortFieldName: 'sims.puk'
      },
      {
        fieldI18nKey: 'sims-page.sim.ip',
        field: 'ip_address',
        sortable: true,
        sortFieldName: 'sims.ip_address'
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
          textI18n: 'sims-page.sim.code',
          placeholderI18n: 'sims-page.sim.code'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'first_name',
          class: 'col-sm-3',
          textI18n: 'sims-page.sim.first_name',
          placeholderI18n: 'sims-page.sim.first_name'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'middle_name',
          class: 'col-sm-3',
          textI18n: 'sims-page.sim.middle_name',
          placeholderI18n: 'sims-page.sim.middle_name'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'last_name',
          class: 'col-sm-3',
          textI18n: 'sims-page.sim.last_name',
          placeholderI18n: 'sims-page.sim.last_name'
        },
        {
          type: FILTER_TYPE.SELECT,
          field: 'unit',
          class: 'col-sm-3',
          textI18n: 'sims-page.sim.unit',
          placeholderI18n: 'sims-page.sim.unit',
          data: [],
          loading: false
        }
      ]
    };
  }

}
