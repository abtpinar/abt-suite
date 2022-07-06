import { Injectable } from '@angular/core';
import { BaseTableFilterFactoryService } from '../../../common/services/base-table-filter-factory.service';
import { LanguageService } from '../../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../../common/components/base-table/base-table-config';
import { MobileModel } from '../models/mobile.model';
import { ContractsConfigService } from 'src/app/contracts/services/contracts-config.service';
import { formatDecimal, parseDateFromString } from 'src/app/common/components/formats';

@Injectable({
  providedIn: 'root'
})
export class MobilesConfigService {

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
        text: 'mobiles-page.mobile.unit',
        placeholder: 'mobiles-page.mobile.unit'
      }
    };
    this.filterFactory.addFiltersDataToCache(selectFilters);
  }

  getListColumns(units = []): Column[] {
    return [
      {
        fieldI18nKey: 'mobiles-page.mobile.imei',
        field: 'imei',
        sortable: true,
        sortFieldName: 'mobiles.imei'
      },
      {
        fieldI18nKey: 'mobiles-page.mobile.imei2',
        field: 'imei2',
        sortable: true,
        sortFieldName: 'mobiles.imei2'
      },
      {
        fieldI18nKey: 'mobiles-page.mobile.mac',
        field: 'mac',
        format: mac => mac.toUpperCase(),
        sortable: true,
        sortFieldName: 'mobiles.mac'
      },
      {
        fieldI18nKey: 'mobiles-page.mobile.brand',
        field: 'mobile_model',
        format: mobile_model => mobile_model.data.brand_name,
        sortable: false,
      },
      {
        fieldI18nKey: 'mobiles-page.mobile.model',
        field: 'mobile_model',
        format: mobile_model => mobile_model.data.name,
        sortable: false,
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
          textI18n: 'mobiles-page.mobile.code',
          placeholderI18n: 'mobiles-page.mobile.code'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'first_name',
          class: 'col-sm-3',
          textI18n: 'mobiles-page.mobile.first_name',
          placeholderI18n: 'mobiles-page.mobile.first_name'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'middle_name',
          class: 'col-sm-3',
          textI18n: 'mobiles-page.mobile.middle_name',
          placeholderI18n: 'mobiles-page.mobile.middle_name'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'last_name',
          class: 'col-sm-3',
          textI18n: 'mobiles-page.mobile.last_name',
          placeholderI18n: 'mobiles-page.mobile.last_name'
        },
        {
          type: FILTER_TYPE.SELECT,
          field: 'unit',
          class: 'col-sm-3',
          textI18n: 'mobiles-page.mobile.unit',
          placeholderI18n: 'mobiles-page.mobile.unit',
          data: [],
          loading: false
        }
      ]
    };
  }

}
