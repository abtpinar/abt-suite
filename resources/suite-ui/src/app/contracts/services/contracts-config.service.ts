import { Injectable } from '@angular/core';
import { BaseTableFilterFactoryService } from '../../common/services/base-table-filter-factory.service';
import { LanguageService } from '../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../common/components/base-table/base-table-config';
import { ContractStates } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractsConfigService {

  constructor(
    private filterFactory: BaseTableFilterFactoryService,
    private languageService: LanguageService,
  ) {
    this.init();
  }

  init() {
    const selectFilters = {
      unit: {
        text: 'contracts-page.contract.unit',
        placeholder: 'contracts-page.contract.unit'
      }
    };
    this.filterFactory.addFiltersDataToCache(selectFilters);
  }

  get contractStates() {
    return ContractStates;
  }

  getListColumns(units = []): Column[] {
    return [
      {
        fieldI18nKey: 'contracts-page.contract.code',
        field: 'id',
        format: id => `#${id}`,
        sortable: true,
        sortFieldName: 'contracts.id'
      },
      {
        fieldI18nKey: 'contracts-page.contract.state',
        field: 'state',
        format: state => this.formatStateColumn(state),
        sortable: true,
        sortFieldName: 'contracts.state',
        nowrap: true
      },
      {
        fieldI18nKey: 'contracts-page.contract.farmer',
        field: 'farmer',
        format: farmer => this.formatFarmerColumn(farmer),
        sortable: true,
        sortFieldName: 'contracts.farmer_id'
      },
      {
        fieldI18nKey: 'contracts-page.contract.tobacco_type',
        field: 'tobacco_type_name',
        format: tobacco_type_name => this.formatTobaccoType(tobacco_type_name),
        sortable: true,
        sortFieldName: 'contracts.tobacco_type'
      },

      {
        fieldI18nKey: 'contracts-page.contract.unit',
        field: 'production_unit',
        format: production_unit => this.formatUnitColumn(production_unit),
        sortable: true,
        sortFieldName: 'contracts.unit'
      },
      /*{
        fieldI18nKey: 'contracts-page.contract.date',
        field: 'date',
        sortable: true,
        sortFieldName: 'contracts.date'
      },*/
      {
        fieldI18nKey: 'contracts-page.contract.planting_area',
        field: 'planting_area',
        format: planting_area => planting_area.toFixed(2),
        sortable: true,
        sortFieldName: 'contracts.planting_area'
      },
      {
        fieldI18nKey: 'contracts-page.contract.performance',
        field: 'performance',
        sortable: true,
        sortFieldName: 'contracts.performance'
      },
      {
        fieldI18nKey: 'contracts-page.contract.purchase_budget',
        field: 'purchase_budget',
        format: purchase_budget => purchase_budget.toFixed(2),
        sortable: true,
        sortFieldName: 'contracts.purchase_budget'
      }
    ];
  }

  formatUnitColumn(production_unit) {
    const {data} = production_unit;
    return data ? data.name : production_unit;
  }

  formatFarmerColumn(farmer) {
    const { data } = farmer;
    return data ? `${data.first_name} ${data.middle_name} ${data.last_name}` : farmer;
  }

  formatTobaccoType(tobacco_type_name) {
    return tobacco_type_name ? tobacco_type_name.name : tobacco_type_name;
  }

  formatStateColumn(state) {
    const translated = this.languageService.translate(`contracts.states.${state}`).toUpperCase();

    let className = '';
    switch (state) {
      case this.contractStates.Draft:
        className = 'default';
        break;

      case this.contractStates.InProgress:
        className = 'warning';
        break;

      case this.contractStates.Accepted:
        className = 'info';
        break;

      case this.contractStates.Activated:
        className = 'success';
        break;

      case this.contractStates.Annulled:
      case this.contractStates.Rejected:
      case this.contractStates.Discharged:
      case this.contractStates.Suspended:
        className = 'danger';
        break;

      default:
        break;
    }
    return `<span class="status mr-1 text-${className}">●</span> ${translated}`;
  }

  getListFilters(): FiltersConfiguration {
    return {
      filters: [
        {
          type: FILTER_TYPE.TEXT,
          field: 'code',
          class: 'col-sm-3',
          textI18n: 'contracts-page.contract.code',
          placeholderI18n: 'contracts-page.contract.code'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'farmer_name',
          class: 'col-sm-3',
          textI18n: 'contracts-page.contract.first_name',
          placeholderI18n: 'contracts-page.contract.first_name'
        },
        {
          type: FILTER_TYPE.SELECT,
          field: 'state',
          class: 'col-sm-3',
          textI18n: 'contracts-page.contract.state',
          placeholderI18n: 'contracts-page.contract.state',
          data: this.getContractStatesForSearchFilter(),
          loading: false
        },
        {
          type: FILTER_TYPE.SELECT,
          field: 'unit',
          class: 'col-sm-3',
          textI18n: 'contracts-page.contract.unit',
          placeholderI18n: 'contracts-page.contract.unit',
          data: [],
          loading: false
        }
      ]
    };
  }

  getContractStatesAsArray() {
    const enumKeys = Object.keys(this.contractStates);
    return enumKeys.map(k => this.contractStates[k]);
  }

  public getContractStatesForSearchFilter() {
    return this.getContractStatesAsArray().map(state => ({
      id: state,
      name: this.languageService.translate(`contracts.states.${state}`)
    }));
  }

}
