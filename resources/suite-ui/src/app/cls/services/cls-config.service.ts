import { Injectable } from '@angular/core';
import { BaseTableFilterFactoryService } from '../../common/services/base-table-filter-factory.service';
import { LanguageService } from '../../i18n/services/language.service';
import { Column, FILTER_TYPE, FiltersConfiguration, SelectFilterInput } from '../../common/components/base-table/base-table-config';
import { formatDecimal } from 'src/app/common/components/formats';
import { CheckboxColumnComponent } from 'src/app/common/components/checkbox-column/checkbox-column.component';
import { CLModel, CLStates } from '../models/cl.model';
import { DynamicCheckboxColumnsSelectionDispatcherService } from 'src/app/common/services/dynamic-checkbox-columns-selection-dispatcher.service';
import { CheckboxColumnHeaderComponent } from 'src/app/common/components/checkbox-column-header/checkbox-column-header.component';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CLsConfigService {

  private _clsMarkedForAction: { [key: string]: CLModel } = {};

  constructor(
    private filterFactory: BaseTableFilterFactoryService,
    private languageService: LanguageService,
    private selectionDispatcher: DynamicCheckboxColumnsSelectionDispatcherService,
  ) {
    this.init();
  }

  init() {
    const selectFilters = {
      unit: {
        text: 'cls-results-page.cl.unit',
        placeholder: 'cls-results-page.cl.unit'
      },
      type: {
        text: 'cls-results-page.cl.tobacco_type',
        placeholder: 'cls-results-page.cl.tobacco_type'
      },
      status: {
        text: 'cls-results-page.cl.status',
        placeholder: 'cls-results-page.cl.status'
      }
    };
    this.filterFactory.addFiltersDataToCache(selectFilters);
  }

  getListColumns(showUnits: boolean = false): Column[] {
    const checkboxesColumn: Column = {
      field: 'action_handler',
      dynamicColumn: {
        dynamicComponentInstance: CheckboxColumnComponent,
        disabled: (cl: CLModel) => !['IMPORTED', 'UPDATED', 'IN_PROGRESS', 'FIXED_FEE', 'PAID'].includes(cl.status),
        selected: (cl: CLModel) => this._clsMarkedForAction.hasOwnProperty(cl.id),
        dynamicComponentDataOutput: data => this.toggleCLForAction(data)
      },
      dynamicHeader: {
        dynamicComponentInstance: CheckboxColumnHeaderComponent
      }
    };

    let farmersColumns = [
      {
        fieldI18nKey: 'cls-results-page.cl.farmer_name',
        field: 'farmer_name',
        sortable: true,
        sortFieldName: 'cl.farmer_name'
      },
      {
        fieldI18nKey: 'cls-results-page.cl.farmer_code',
        field: 'farmer_code',
        sortable: true,
        sortFieldName: 'cl.farmer_code'
      }
    ];

    let unitsColumns = [
      {
        fieldI18nKey: 'cls-results-page.cl.unit',
        field: 'unit_name',
        sortable: true,
        sortFieldName: 'cl.unit_name'
      }
    ];

    let basicColumns = [
      {
        fieldI18nKey: 'cls-results-page.cl.status',
        field: 'status',
        format: status => this.formatStatusColumn(status),
        sortable: true,
        nowrap: true,
        sortFieldName: 'cl.status'
      },
      {
        fieldI18nKey: 'cls-results-page.cl.kilograms',
        field: 'kilograms',
        format: kilograms => '' + formatDecimal(kilograms, 2),
        sortable: true,
        sortFieldName: 'cl.kilograms'
      },
      {
        fieldI18nKey: 'cls-results-page.cl.amount',
        field: 'amount',
        format: amount => '' + formatDecimal(amount, 2),
        sortable: true,
        sortFieldName: 'cl.amount'
      }
    ];

    let clColumns = [
      {
        fieldI18nKey: 'cls-results-page.cl.amount_cl',
        field: 'amount',
        format: amount => '' + formatDecimal(this.availableCL(amount), 2),
        sortable: true,
        sortFieldName: 'cl.amount'
      }
    ];

    let percentColumns = [
      {
        fieldI18nKey: 'cls-results-page.cl.amount_020',
        field: 'amount',
        format: amount => '' + formatDecimal(amount * 0.20 / 100, 2),
        sortable: true,
        sortFieldName: 'cl.amount'
      }
    ];

    let regularColumns: Column[] = [
      
      // {
      //   fieldI18nKey: 'cls-results-page.cl.tobacco_type',
      //   field: 'tobacco_type',
      //   format: tobacco_type => tobacco_type == 'T' ? 'Tapado' : 'Sol',
      //   sortable: true,
      //   sortFieldName: 'cls.tobacco_type'
      // },      
      {
        fieldI18nKey: 'cls-results-page.cl.expense',
        field: 'expense',
        format: expense => '' + formatDecimal(expense, 2),
        sortable: true,
        sortFieldName: 'cl.expense'
      },
      {
        fieldI18nKey: 'cls-results-page.cl.final',
        field: 'amount',
        formatRow: i => formatDecimal(showUnits ? this.availableUnitsAmount(i) : this.availableAmount(i), 2),
        sortable: true,
        sortFieldName: 'cl.amount'
      },
      {
        fieldI18nKey: 'cls-results-page.cl.sustract',
        field: 'amount',
        formatRow: i => formatDecimal(this.retireAmount(i), 2),
        sortable: true,
        sortFieldName: 'cl.amount'
      },
      // {
      //   fieldI18nKey: 'cls-results-page.cl.total',
      //   field: 'amount',
      //   formatRow: i => '' + formatDecimal((i.amount - (i.amount * 0.20 / 100) - i.expense), 2),
      //   sortable: true,
      //   sortFieldName: 'cls.amount'
      // },
    ];

    if (showUnits)
      return [checkboxesColumn, ...unitsColumns, ...basicColumns, ...percentColumns, ...regularColumns];

    return [checkboxesColumn, ...farmersColumns, ...basicColumns, ...clColumns, ...percentColumns, ...regularColumns];
  }

  availableCL(amount) {
    return amount * 3.6 / 100;
  }

  // disponible: neto - gasto
  availableAmount(i: any) {
    return this.availableCL(i.amount) - i.expense;
  }

  // disponible: neto - gasto
  availableUnitsAmount(i: any) {
    return +formatDecimal(i.amount * 0.20 / 100, 2).replace(',', '') - i.expense;
  }

  // los retiros
  retireAmount(i: any) {
    let result = 0;
    if (i.payments.data)
      i.payments.data.map(element => result += element.amount);
    return result;
  }

  // por pagar: disponible - los retiros
  sustractAmount(i: any) {
    let result = 0;
    if (i.payments.data)
      i.payments.data.map(element => result = result + element.amount);
    return result;
  }

  finalUnitAmount(i: any) {
    return this.availableUnitsAmount(i) - this.sustractAmount(i);
  }

  finalAmount(i: any) {
    return this.availableAmount(i) - this.sustractAmount(i);
  }

  formatStatusColumn(status) {
    const translated = this.languageService.translate(`cls-results-page.cl.status.${status}`).toUpperCase();

    let className = '';
    switch (status) {
      case this.clStatus.Imported:
      case this.clStatus.Updated:
        className = 'default';
        break;

      case this.clStatus.InProgress:
        className = 'warning';
        break;

      case this.clStatus.FixedFee:
        className = 'info';
        break;

      case this.clStatus.Paid:
      case this.clStatus.Finished:
        className = 'success';
        break;

      default:
        break;
    }
    return `<span class="status mr-1 text-${className}">●</span> ${translated}`;
  }

  get clStatus() {
    return CLStates;
  }

  private toggleCLForAction(data: {
    columnData: Column;
    rowData: CLModel;
    event: boolean;
  }): any {
    const { rowData: cl, event } = data;
    if (event) {
      this._clsMarkedForAction[cl.id] = cl;
    } else {
      delete this._clsMarkedForAction[cl.id];
    }
  }

  get clsMarkedForAction() {
    return Object.keys(this._clsMarkedForAction).map(
      k => this._clsMarkedForAction[k]
    );
  }

  clearMarkedCls(): any {
    this._clsMarkedForAction = {};
    this.selectionDispatcher.notifyParentCheckEvent(false);
  }

  getListFilters(showUnits: boolean = false): FiltersConfiguration {
    const statusFilter: SelectFilterInput = {
      type: FILTER_TYPE.SELECT,
      field: 'status',
      class: 'col-sm-3',
      textI18n: 'farmers-page.farmer.status',
      placeholderI18n: 'farmers-page.farmer.status',
      data: [],
      loading: false,
      multipleSelection: true
    };

    const unitsFilter: SelectFilterInput = {
      type: FILTER_TYPE.SELECT,
      field: 'unit',
      class: 'col-sm-3',
      textI18n: 'cls-results-page.cl.unit',
      placeholderI18n: 'cls-results-page.cl.unit',
      data: [],
      loading: false
    };

    if (showUnits)
      return{
        filters: [
          unitsFilter,
          statusFilter
        ]
      };

    return {
      filters: [
        {
          type: FILTER_TYPE.TEXT,
          field: 'farmer_code',
          class: 'col-sm-3',
          textI18n: 'cls-results-page.cl.farmer_code',
          placeholderI18n: 'cls-results-page.cl.farmer_code'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'farmer_name',
          class: 'col-sm-3',
          textI18n: 'cls-results-page.cl.farmer_name',
          placeholderI18n: 'cls-results-page.cl.farmer_name'
        },
        unitsFilter,
        {
          type: FILTER_TYPE.SELECT,
          field: 'type',
          class: 'col-sm-3',
          textI18n: 'cls-results-page.cl.tobacco_type',
          placeholderI18n: 'cls-results-page.cl.tobacco_type',
          data: [],
          loading: false
        },
        statusFilter
      ]
    };
  }

}
