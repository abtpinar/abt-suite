import { Injectable } from '@angular/core';
import { BaseTableFilterFactoryService } from '../../common/services/base-table-filter-factory.service';
import { LanguageService } from '../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../common/components/base-table/base-table-config';
import { formatDecimal, globalFormatDate } from 'src/app/common/components/formats';

@Injectable({
  providedIn: 'root'
})
export class CLPaymentsConfigService {

  constructor(
    private filterFactory: BaseTableFilterFactoryService,
    private languageService: LanguageService,
  ) {
    this.init();
  }

  init() {
    const selectFilters = {
      unit: {
        text: 'cls-page.cl.unit',
        placeholder: 'cls-page.cl.unit'
      }
    };
    this.filterFactory.addFiltersDataToCache(selectFilters);
  }

  getListColumns(units = []): Column[] {
    return [
      {
        fieldI18nKey: 'cls-payments-page.payment.code',
        field: 'id',
        sortable: true,
        sortFieldName: 'cl_payments.id'
      },
      {
        fieldI18nKey: 'cls-payments-page.payment.date',
        field: 'start_date',
        sortable: true,
        sortFieldName: 'cl_payments.start_date',
        format: start_date => globalFormatDate(start_date)
      },
      {
        fieldI18nKey: 'cls-payments-page.payment.status',
        field: 'status',
        sortable: true,
        sortFieldName: 'cl_payments.status'
      },
      {
        fieldI18nKey: 'cls-payments-page.payment.unit',
        field: 'status',
        sortable: true,
        sortFieldName: 'cl_payments.status',
        formatRow: payment => this.formatUnitColumn(payment)
      },
      {
        fieldI18nKey: 'cls-payments-page.payment.farmers',
        field: 'status',
        sortable: true,
        sortFieldName: 'cl_payments.status',
        formatRow: payment => payment.cls.data.length
      },
      {
        fieldI18nKey: 'cls-payments-page.payment.amount',
        field: 'status',
        sortable: true,
        sortFieldName: 'cl_payments.status',
        formatRow: payment => this.formatAmountColumn(payment)
      }
    ];
  }

  formatUnitColumn(payment) {
    let units = [];
    payment.cls.data.forEach(element => {
      if (!units.includes(element.unit))
        units.push(element.unit);
    });
    if (units.length > 1)
      return 'Varias Unidades';
    return units[0];
  }

  formatAmountColumn(payment) {
    let amount = 0;
    payment.cls.data.forEach(element => {
      amount += element.amount;
    });
    return formatDecimal(amount, 2);
  }

  getListFilters(): FiltersConfiguration {
    return {
      filters: [
        {
          type: FILTER_TYPE.TEXT,
          field: 'farmer_code',
          class: 'col-sm-3',
          textI18n: 'cls-page.cl.farmer_code',
          placeholderI18n: 'cls-page.cl.farmer_code'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'farmer_name',
          class: 'col-sm-3',
          textI18n: 'cls-page.cl.farmer_name',
          placeholderI18n: 'cls-page.cl.farmer_name'
        }
      ]
    };
  }

}
