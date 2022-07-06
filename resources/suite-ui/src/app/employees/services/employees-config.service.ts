import { Injectable } from '@angular/core';
import { BaseTableFilterFactoryService } from '../../common/services/base-table-filter-factory.service';
import { LanguageService } from '../../i18n/services/language.service';
import { Column, FILTER_TYPE, FiltersConfiguration } from '../../common/components/base-table/base-table-config';
import { EmployeeModel } from '../models/employee.model';
import { ContractsConfigService } from 'src/app/contracts/services/contracts-config.service';
import { formatDecimal, parseDateFromString } from 'src/app/common/components/formats';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesConfigService {

  constructor(
    private filterFactory: BaseTableFilterFactoryService,
    private languageService: LanguageService,
    private contractsConfigService: ContractsConfigService,
    private codeTablesService: CodeTablesService
  ) {
    this.init();
  }

  init() {
    const selectFilters = {
      unit: {
        text: 'employees-page.employee.department',
        placeholder: 'employees-page.employee.department'
      }
    };
    this.filterFactory.addFiltersDataToCache(selectFilters);
  }

  getListColumns(tableCodes = null): Column[] {
    return [
      {
        fieldI18nKey: 'employees-page.employee.dni',
        field: 'dni',
        sortable: true,
        sortFieldName: 'employees.dni'
      },
      {
        fieldI18nKey: 'employees-page.employee.first_name',
        field: 'first_name',
        sortable: true,
        sortFieldName: 'employees.first_name'
      },
      {
        fieldI18nKey: 'employees-page.employee.middle_name',
        field: 'middle_name',
        sortable: true,
        sortFieldName: 'employees.middle_name'
      },
      {
        fieldI18nKey: 'employees-page.employee.last_name',
        field: 'last_name',
        sortable: true,
        sortFieldName: 'employees.last_name'
      },
      {
        fieldI18nKey: 'employees-page.employee.department',
        field: 'department',
        format: department => this.formatTableCodeColumn(tableCodes, department, this.codeTablesService.availableTableKeys.Departments),
        sortable: true,
        sortFieldName: 'employees.department'
      },
      {
        fieldI18nKey: 'employees-page.employee.occupation',
        field: 'occupation',
        format: occupation => this.formatTableCodeColumn(tableCodes, occupation, this.codeTablesService.availableTableKeys.Occupations),
        sortable: true,
        sortFieldName: 'employees.occupation'
      },
      // {
      //   fieldI18nKey: 'employees-page.employee.contract',
      //   field: 'unit',
      //   formatRow: (employee: EmployeeModel) => this.formatContractColumn(employee),
      //   sortable: true,
      //   sortFieldName: 'employees.unit'
      // },
      // {
      //   fieldI18nKey: 'employees-page.employee.status',
      //   field: 'unit',
      //   formatRow: (employee: EmployeeModel) => this.formatContractStateColumn(employee),
      //   sortable: true,
      //   sortFieldName: 'employees.unit'
      // },
      // {
      //   fieldI18nKey: 'employees-page.employee.expiration',
      //   field: 'unit',
      //   formatRow: (employee: EmployeeModel) => this.formatContractExpirationColumn(employee),
      //   sortable: true,
      //   sortFieldName: 'employees.unit'
      // }
    ];
  }

  formatTableCodeColumn(tableCodes, value, key) {
    if (tableCodes && tableCodes[key]) {
      const item = tableCodes[key].find(element => element.code == value);
      return item ? item.name : value;
    }
    return value;
  }

  // formatContractColumn(employee) {
  //   const { data } = employee.contracts;
  //   return data && data.length > 0 ? `Contrato #${data[0].id}` : '-';
  // }

  // formatContractStateColumn(employee) {
  //   const { data } = employee.contracts;
  //   return data && data.length > 0 ? this.contractsConfigService.formatStateColumn(data[0].state) : '-';
  // }

  // formatContractExpirationColumn(employee) {
  //   const { data } = employee.contracts;
  //   if (data && data.length > 0) {
  //     const today = new Date();
  //     const date = parseDateFromString(data[0].expiration_date);
  //     const diff = date.getTime() - today.getTime();
  //     const diffInDays = (diff > 0) ? (diff / 1000 / 60 / 60 / 24) : 0;
  //     return `${formatDecimal(diffInDays, 0)} días`
  //   }

  //   return '-';
  // }

  getListFilters(): FiltersConfiguration {
    return {
      filters: [
        {
          type: FILTER_TYPE.TEXT,
          field: 'dni',
          class: 'col-sm-3',
          textI18n: 'employees-page.employee.dni',
          placeholderI18n: 'employees-page.employee.dni'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'first_name',
          class: 'col-sm-3',
          textI18n: 'employees-page.employee.first_name',
          placeholderI18n: 'employees-page.employee.first_name'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'middle_name',
          class: 'col-sm-3',
          textI18n: 'employees-page.employee.middle_name',
          placeholderI18n: 'employees-page.employee.middle_name'
        },
        {
          type: FILTER_TYPE.TEXT,
          field: 'last_name',
          class: 'col-sm-3',
          textI18n: 'employees-page.employee.last_name',
          placeholderI18n: 'employees-page.employee.last_name'
        },
        {
          type: FILTER_TYPE.SELECT,
          field: 'department',
          class: 'col-sm-3',
          textI18n: 'employees-page.employee.department',
          placeholderI18n: 'employees-page.employee.department',
          data: [],
          loading: false
        }
      ]
    };
  }

}
