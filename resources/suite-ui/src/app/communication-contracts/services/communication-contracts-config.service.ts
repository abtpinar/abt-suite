import { Injectable } from '@angular/core';
import { BaseTableFilterFactoryService } from '../../common/services/base-table-filter-factory.service';
import { LanguageService } from '../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../common/components/base-table/base-table-config';
import { CommunicationContractStates } from '../models/communication-contract.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationContractsConfigService {

  constructor(
    private filterFactory: BaseTableFilterFactoryService,
    private languageService: LanguageService,
  ) {
    this.init();
  }

  init() {
    const selectFilters = {
      unit: {
        text: 'communication-contracts-page.contract.unit',
        placeholder: 'communication-contracts-page.contract.unit'
      }
    };
    this.filterFactory.addFiltersDataToCache(selectFilters);
  }

  getListColumns(units = []): Column[] {
    return [
      {
        fieldI18nKey: 'communication-contracts-page.contract.code',
        field: 'id',
        sortable: true,
        sortFieldName: 'communication_contracts.id'
      },
      {
        fieldI18nKey: 'communication-contracts-page.contract.state',
        field: 'state',
        format: state => this.formatStateColumn(state),
        sortable: true,
        sortFieldName: 'communication_contracts.state',
        nowrap: true
      },
      {
        fieldI18nKey: 'communication-contracts-page.contract.version',
        field: 'version',
        sortable: true,
        sortFieldName: 'communication_contracts.version'
      },
      {
        fieldI18nKey: 'communication-contracts-page.contract.employee',
        field: 'employee',
        format: employee => this.formatEmployeeColumn(employee),
        sortable: true,
        sortFieldName: 'communication_contracts.employee_id'
      },
      {
        fieldI18nKey: 'communication-contracts-page.contract.activation_date',
        field: 'activation_date',
        sortable: true,
        sortFieldName: 'communication_contracts.activation_date'
      },
      {
        fieldI18nKey: 'communication-contracts-page.contract.mobile',
        field: 'mobile_id',
        formatRow: contract => contract.mobile_model.data.length > 0 ? `${contract.mobile_model.data[0].brand_name} (${contract.mobile_model.data[0].name})` : '-',
        sortable: true,
        sortFieldName: 'communication_contracts.mobile_id'
      },
      {
        fieldI18nKey: 'communication-contracts-page.contract.sim',
        field: 'sim',
        format: sim => sim ? `+53 ${sim.data.number}` : '-',
        sortable: true,
        sortFieldName: 'communication_contracts.sim_id'
      }
    ];
  }

  formatUnitColumn(units, unit) {
    const item = units.find(element => element.code == unit);
    return item ? item.name : unit;
  }

  formatEmployeeColumn(employee) {
    const { data } = employee;
    return data ? `${data.first_name} ${data.middle_name} ${data.last_name}` : employee;
  }

  formatStateColumn(state) {
    const translated = this.languageService.translate(`communication-contracts-page.contract.state.${state}`).toUpperCase();

    let className = 'default';
    switch (state) {
      case this.contractStates.InProgress:
        className = 'warning';
        break;

      case this.contractStates.Accepted:
        className = 'info';
        break;

      case this.contractStates.Activated:
        className = 'success';
        break;

    //   case this.contractStates.Annulled:
    //   case this.contractStates.Rejected:
    //   case this.contractStates.Discharged:
    //   case this.contractStates.Suspended:
    //     className = 'danger';
    //     break;

      default:
        break;
    }
    return `<span class="status mr-1 text-${className}">●</span> ${translated}`;
  }

  get contractStates() {
    return CommunicationContractStates;
  }

  getListFilters(): FiltersConfiguration {
    return {
      filters: [
        {
          type: FILTER_TYPE.TEXT,
          field: 'code',
          class: 'col-sm-3',
          textI18n: 'communication-contracts-page.contract.code',
          placeholderI18n: 'communication-contracts-page.contract.code'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'employee_name',
          class: 'col-sm-3',
          textI18n: 'communication-contracts-page.contract.first_name',
          placeholderI18n: 'communication-contracts-page.contract.first_name'
        },
        {
          type: FILTER_TYPE.SELECT,
          field: 'unit',
          class: 'col-sm-3',
          textI18n: 'communication-contracts-page.contract.unit',
          placeholderI18n: 'communication-contracts-page.contract.unit',
          data: [],
          loading: false
        }
      ]
    };
  }

}
