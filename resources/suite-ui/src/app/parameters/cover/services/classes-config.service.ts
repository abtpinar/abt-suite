import {Injectable} from '@angular/core';
import {BaseTableFilterFactoryService} from '../../../common/services/base-table-filter-factory.service';
import {LanguageService} from '../../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../../common/components/base-table/base-table-config';
import {ClassModel} from '../models/class.model';
import {ContractsConfigService} from 'src/app/contracts/services/contracts-config.service';
import {formatDecimal, parseDateFromString} from 'src/app/common/components/formats';

@Injectable({
    providedIn: 'root'
})
export class ClassesConfigService {

    constructor(private filterFactory: BaseTableFilterFactoryService,
                private languageService: LanguageService,
                private contractsConfigService: ContractsConfigService,) {
        this.init();
    }

    init() {
        const selectFilters = {
            unit: {
                text: 'classes-page.class.unit',
                placeholder: 'classes-page.class.unit'
            }
        };
        this.filterFactory.addFiltersDataToCache(selectFilters);
    }

    getListColumns(types = []): Column[] {
        return [
            {
                fieldI18nKey: 'classes-page.class.tobacco_type',
                field: 'tobacco_type',
                format: tobacco_type => this.formatTobaccoTypeColumn(tobacco_type),
                sortable: true,
                sortFieldName: 'tobacco_classes.name'
            },
            {
                fieldI18nKey: 'classes-page.class.name',
                field: 'name',
                sortable: true,
                sortFieldName: 'tobacco_classes.name'
            },
            {
                fieldI18nKey: 'classes-page.class.type',
                field: 'type',
                sortable: true,
                format: type => this.formatTypeColumn(types, type),
                sortFieldName: 'tobacco_classes.type'
            },
            {
                fieldI18nKey: 'classes-page.class.group',
                field: 'group',
                sortable: true,
                formatRow: row => this.formatGroupColumn(types, row),
                sortFieldName: 'tobacco_classes.group'
            },
            {
                fieldI18nKey: 'classes-page.class.price',
                field: 'price',
                sortable: true,
                sortFieldName: 'tobacco_classes.price'
            }
        ];
    }

    formatTypeColumn(items, item) {
        const element = items.find(element => element.code == item);
        return element ? element.name : item;
    }

    formatGroupColumn(units, row) {
        if (!row.group)
            return '-'
        const item = units.find(element => element.code == row.type);
        const group = item ? item.groups.find(element => element.code == row.group) : null;
        return group ? group.name : row.group;
    }

    getListFilters(): FiltersConfiguration {
        return {
            filters: [
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'code',
                    class: 'col-sm-3',
                    textI18n: 'classes-page.class.code',
                    placeholderI18n: 'classes-page.class.code'
                },
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'first_name',
                    class: 'col-sm-3',
                    textI18n: 'classes-page.class.first_name',
                    placeholderI18n: 'classes-page.class.first_name'
                },
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'middle_name',
                    class: 'col-sm-3',
                    textI18n: 'classes-page.class.middle_name',
                    placeholderI18n: 'classes-page.class.middle_name'
                },
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'last_name',
                    class: 'col-sm-3',
                    textI18n: 'classes-page.class.last_name',
                    placeholderI18n: 'classes-page.class.last_name'
                },
                {
                    type: FILTER_TYPE.SELECT,
                    field: 'unit',
                    class: 'col-sm-3',
                    textI18n: 'classes-page.class.unit',
                    placeholderI18n: 'classes-page.class.unit',
                    data: [],
                    loading: false
                }
            ]
        };
    }

    formatTobaccoTypeColumn(tobacco_type) {
        return tobacco_type ? tobacco_type.name : tobacco_type;
    }

}
