import {Injectable} from '@angular/core';
import {BaseTableFilterFactoryService} from '../../common/services/base-table-filter-factory.service';
import {LanguageService} from '../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../common/components/base-table/base-table-config';
import {FarmModel, FarmStates} from '../models/farm.model';
import {reduce} from 'rxjs/operators';
import {FarmerModel} from "../../farmers/models/farmer.model";

/*import { ContractStates } from '../models/farm.model';*/

@Injectable({
    providedIn: 'root'
})
export class FarmsConfigService {

    constructor(private filterFactory: BaseTableFilterFactoryService,
                private languageService: LanguageService,) {
        /*this.init();*/
    }

    /* init() {
     /!*const selectFilters = {
     unit: {
     text: 'farms-page.farm.unit',
     placeholder: 'farms-page.farm.unit'
     }
     };
     this.filterFactory.addFiltersDataToCache(selectFilters);*!/
     }*/

    get farmStates() {
        return FarmStates;
    }

    getListColumns(): Column[] {
        return [
            {
                fieldI18nKey: 'farms-page.farm.state',
                field: 'state',
                format: state => this.formatStateColumn(state),
                sortable: true,
                sortFieldName: 'farms.state',
                nowrap: true
            },
            {
                fieldI18nKey: 'farms-page.farm.record_number',
                field: 'record_number',
                format: record_number => `#${record_number}`,
                sortable: true,
                sortFieldName: 'record_number'
            },
            {
                fieldI18nKey: 'farms-page.farm.farmer',
                field: 'farmer',
                format: farmer => this.formatFarmerColumn(farmer),
                sortable: true,
                sortFieldName: 'farms.farmer_id'
            },
            {
                fieldI18nKey: 'farms-page.farm.unit',
                field: 'unit',
                formatRow: (farm: FarmerModel) => this.formatProductionUnit(farm),
                sortable: true,
                sortFieldName: 'unit'
            },
            {
                fieldI18nKey: 'farms-page.farm.possesion_type',
                field: 'possesion_type',
                formatRow: (farm: FarmModel) => this.formatPossesionTypeColumn(farm),
                sortable: true,
                sortFieldName: 'farms.possesion_type',
                nowrap: true
            },
            {
                fieldI18nKey: 'farms-page.farm.ground_feature',
                field: 'ground_feature',
                formatRow: (farm: FarmModel) => this.formatGroundFeatureColumn(farm),
                sortable: true,
                sortFieldName: 'farms.ground_feature',
                nowrap: true
            },
            {
                fieldI18nKey: 'farms-page.farm.activation_date',
                field: 'activation_date',
                sortable: true,
                sortFieldName: 'farms.activation_date'
            },
            {
                fieldI18nKey: 'farms-page.farm.expiration_date',
                field: 'expiration_date',
                sortable: true,
                sortFieldName: 'farms.expiration_date'
            },
            /*{
             fieldI18nKey: 'farms-page.farm.performance',
             field: 'performance',
             sortable: true,
             sortFieldName: 'farms.performance'
             },
             {
             fieldI18nKey: 'farms-page.farm.purchase_budget',
             field: 'purchase_budget',
             sortable: true,
             sortFieldName: 'farms.purchase_budget'
             }*/
        ];
    }

    formatFarmerColumn(farmer) {
        const {data} = farmer;
        return data ? `${data.first_name} ${data.middle_name} ${data.last_name}` : farmer;
    }

    formatPossesionTypeColumn(farm: FarmModel) {
        const {possesion_type} = farm;
        return possesion_type ? possesion_type.name : farm.possesion_type_code;
    }

    formatGroundFeatureColumn(farm: FarmModel) {
        const {ground_feature} = farm;
        return ground_feature ? ground_feature.name : farm.ground_feature_code;
    }

    formatProductionUnit(farm: FarmModel) {
        const { data } = farm.farmer;
        return data.unit ? `${ data.unit['name'] }`: `-`;
    }

    formatStateColumn(state) {
        const translated = this.languageService.translate(`farms.states.${state}`).toUpperCase();

        let className = '';
        switch (state) {
            case 1:
                className = 'success';
                break;

            case 0:
                className = 'danger';
                break;

            /*case this.farmStates.Accepted:
             className = 'info';
             break;

             case this.farmStates.Activated:
             className = 'success';
             break;

             case this.farmStates.Annulled:
             case this.farmStates.Rejected:
             case this.farmStates.Discharged:
             case this.farmStates.Suspended:
             className = 'danger';
             break;*/

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
                    field: 'record_number',
                    class: 'col-sm-3',
                    textI18n: 'farms-page.farm.record_number',
                    placeholderI18n: 'farms-page.farm.record_number'
                },
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'farmer_name',
                    class: 'col-sm-3',
                    textI18n: 'farms-page.farm.farmer',
                    placeholderI18n: 'farms-page.farm.farmer'
                },
                {
                    type: FILTER_TYPE.SELECT,
                    field: 'unit',
                    class: 'col-sm-3',
                    textI18n: 'farms-page.farm.unit',
                    placeholderI18n: 'farms-page.farm.unit',
                    data: [],
                    loading: true
                },
                /*{
                 type: FILTER_TYPE.SELECT,
                 field: 'state',
                 class: 'col-sm-3',
                 textI18n: 'farms-page.farm.state',
                 placeholderI18n: 'farms-page.farm.state',
                 data: this.getContractStatesForSearchFilter(),
                 loading: false
                 },*/
            ]
        };
    }

    getContractStatesAsArray() {
        const enumKeys = Object.keys(this.farmStates);
        return enumKeys.map(k => this.farmStates[k]);
    }

    public getContractStatesForSearchFilter() {
        return this.getContractStatesAsArray().map(state => ({
            id: state,
            name: this.languageService.translate(`farms.states.${state}`)
        }));
    }

}
