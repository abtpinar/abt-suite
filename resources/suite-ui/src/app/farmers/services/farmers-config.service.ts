import {Injectable} from '@angular/core';
import {BaseTableFilterFactoryService} from '../../common/services/base-table-filter-factory.service';
import {LanguageService} from '../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../common/components/base-table/base-table-config';
import {FarmerModel} from '../models/farmer.model';
import {ContractsConfigService} from 'src/app/contracts/services/contracts-config.service';
import {formatDecimal, parseDateFromString} from 'src/app/common/components/formats';
import {ContractStates} from "../../contracts/models/contract.model";

@Injectable({
    providedIn: 'root'
})
export class FarmersConfigService {

    constructor(private filterFactory: BaseTableFilterFactoryService,
                private languageService: LanguageService,
                private contractsConfigService: ContractsConfigService,) {
        this.init();
    }

    init() {
        const selectFilters = {
            unit: {
                text: 'farmers-page.farmer.unit',
                placeholder: 'farmers-page.farmer.unit'
            }
        };
        this.filterFactory.addFiltersDataToCache(selectFilters);
    }

    get contractStates() {
        return ContractStates;
    }

    getListColumns(): Column[] {
        return [
            {
                fieldI18nKey: 'farmers-page.farmer.code',
                field: 'code',
                format: code => this.fromatCodeColumn(code),
                sortable: true,
                sortFieldName: 'farmers.code'
            },
            {
                fieldI18nKey: 'farmers-page.farmer.ci',
                field: 'ci',
                sortable: true,
                sortFieldName: 'farmers.ci'
            },
            {
                fieldI18nKey: 'farmers-form.farmer.telephone',
                field: 'telephone_number',
                format: telephone_number => this.formatTelephoneNumberColumn(telephone_number),
                sortable: false,
            },
            {
                fieldI18nKey: 'farmers-page.farmer.first_name',
                field: 'first_name',
                sortable: true,
                sortFieldName: 'farmers.first_name'
            },
            {
                fieldI18nKey: 'farmers-page.farmer.middle_name',
                field: 'middle_name',
                sortable: true,
                sortFieldName: 'farmers.middle_name'
            },
            {
                fieldI18nKey: 'farmers-page.farmer.last_name',
                field: 'last_name',
                sortable: true,
                sortFieldName: 'farmers.last_name'
            },
            {
                fieldI18nKey: 'farmers-page.farmer.unit',
                field: 'production_unit_id',
                formatRow: farmer => this.formatUnitColumn(farmer),
                sortable: true,
                sortFieldName: 'farmers.production_unit_id'
            },
            {
             fieldI18nKey: 'farmers-page.farmer.contract',
             field: 'unit',
             formatRow: (farmer: FarmerModel) => this.formatContractColumn(farmer),
             sortable: true,
             sortFieldName: 'farmers.unit'
             },
            {
             fieldI18nKey: 'farmers-page.farmer.amoun.farm.amoun.area',
             field: 'unit',
             formatRow: (farmer: FarmerModel) => this.formatCountAreaFarmColumn(farmer),
             sortable: true,
             sortFieldName: 'farmers.unit'
             },
            /*{
             fieldI18nKey: 'farmers-page.farmer.expiration',
             field: 'unit',
             formatRow: (farmer: FarmerModel) => this.formatContractExpirationColumn(farmer),
             sortable: true,
             sortFieldName: 'farmers.unit'
             }*/
        ];
    }

    fromatCodeColumn(code) {
        return code ? `${code}` : '-';
    }

    formatUnitColumn(farmer) {
        const {production_unit} = farmer;
        return production_unit.data ? production_unit.data.name : farmer.production_unit_id;
    }

    formatContractColumn(farmer) {
        const {data} = farmer.contracts;
        var count = 0;
        if(data && data.length > 0){
            for (let contract of data){
                if(contract.state == this.contractStates.Activated)
                    count ++;
            }
        }

        /*return data && data.length > 0 ? `Contrato #${data[0].id}` : '-';*/
        return count > 0 ? `<span class="status mr-1 text-success">●</span>  ${count}` : '-'; /*`${count} ` + this.contractsConfigService.formatStateColumn(this.contractStates.Activated) : '-';*/
    }

    formatContractStateColumn(farmer) {
        const {data} = farmer.contracts;
        return data && data.length > 0 ? this.contractsConfigService.formatStateColumn(data[0].state) : '-';
    }

    formatCountAreaFarmColumn(farmer) {
        const {data} = farmer.farms;
        var area = 0;
        if (data && data.length > 0) {

            for (let farm of data){
                area += farm.total_area;
            }

            /*const today = new Date();
            const date = parseDateFromString(data[0].expiration_date);
            const diff = date.getTime() - today.getTime();
            const diffInDays = (diff > 0) ? (diff / 1000 / 60 / 60 / 24) : 0;
            return `${formatDecimal(diffInDays, 0)} días`*/
        }

        return area > 0 ?`${area.toFixed(2)} ha`:'-';
    }

    formatTelephoneNumberColumn(telephone_number) {
        return telephone_number ? `+53 ${telephone_number}` : '-';
    }

    getListFilters(): FiltersConfiguration {
        return {
            filters: [
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'code',
                    class: 'col-sm-3',
                    textI18n: 'farmers-page.farmer.code',
                    placeholderI18n: 'farmers-page.farmer.code'
                },
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'first_name',
                    class: 'col-sm-3',
                    textI18n: 'farmers-page.farmer.first_name',
                    placeholderI18n: 'farmers-page.farmer.first_name'
                },
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'middle_name',
                    class: 'col-sm-3',
                    textI18n: 'farmers-page.farmer.middle_name',
                    placeholderI18n: 'farmers-page.farmer.middle_name'
                },
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'last_name',
                    class: 'col-sm-3',
                    textI18n: 'farmers-page.farmer.last_name',
                    placeholderI18n: 'farmers-page.farmer.last_name'
                },
                {
                    type: FILTER_TYPE.SELECT,
                    field: 'unit',
                    class: 'col-sm-3',
                    textI18n: 'farmers-page.farmer.unit',
                    placeholderI18n: 'farmers-page.farmer.unit',
                    data: [],
                    loading: false
                }
            ]
        };
    }

}
