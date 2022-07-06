import {Injectable} from '@angular/core';
import {BaseTableFilterFactoryService} from '../../common/services/base-table-filter-factory.service';
import {LanguageService} from '../../i18n/services/language.service';
import {Column, FILTER_TYPE, FiltersConfiguration} from '../../common/components/base-table/base-table-config';
import {CodeTablesService} from "../../common/services/code-tables.service";
import {ProductModel} from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductsConfigService {

    constructor(private filterFactory: BaseTableFilterFactoryService,
                private languageService: LanguageService,) {
        this.init();
    }

    init() {
        const selectFilters = {
            unit: {
                text: 'products-page.product.unit',
                placeholder: 'products-page.product.unit'
            }
        };
        this.filterFactory.addFiltersDataToCache(selectFilters);
    }

    getListColumns(units = []): Column[] {
        return [
            {
                fieldI18nKey: 'products-page.product.code',
                field: 'code',
                sortable: true,
                sortFieldName: 'products.code'
            },
            {
                fieldI18nKey: 'products-page.product.name',
                field: 'name',
                sortable: true,
                sortFieldName: 'products.name'
            },
            {
                fieldI18nKey: 'products-page.product.price',
                field: 'price',
                sortable: true,
                sortFieldName: 'products.price'
            },
            /*{
                fieldI18nKey: 'products-page.product.expense',
                field: 'expense_concept',
                format: expense_concept => this.formatExpenseConcept(expense_concept),
                sortable: true,
                sortFieldName: 'products.expense'
            },*/
            {
                fieldI18nKey: 'products-page.product.category',
                field: 'category_name',
                formatRow: (product: ProductModel) => this.formatCategoriesColumn(product),
                sortable: true,
                sortFieldName: 'products.expense'
            },
            {
                fieldI18nKey: 'products-page.product.consumption_standard_tp',
                field: 'consumption_standard_tp',
                sortable: true,
                sortFieldName: 'products.expense'
            },
            {
                fieldI18nKey: 'products-page.product.consumption_standard_v1',
                field: 'consumption_standard_v1',
                sortable: true,
                sortFieldName: 'products.expense'
            },
            {
                fieldI18nKey: 'products-page.product.consumption_standard_v2',
                field: 'consumption_standard_v2',
                sortable: true,
                sortFieldName: 'products.expense'
            },
            {
                fieldI18nKey: 'products-page.product.consumption_standard_sp',
                field: 'consumption_standard_sp',
                sortable: true,
                sortFieldName: 'products.expense'
            },
            {
                fieldI18nKey: 'products-page.product.consumption_standard_by',
                field: 'consumption_standard_by',
                sortable: true,
                sortFieldName: 'products.expense'
            },
            {
                fieldI18nKey: 'products-page.product.consumption_standard_vg',
                field: 'consumption_standard_vg',
                sortable: true,
                sortFieldName: 'products.expense'
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
                    textI18n: 'products-page.product.code',
                    placeholderI18n: 'products-page.product.code'
                },
                {
                    type: FILTER_TYPE.TEXT,
                    field: 'name',
                    class: 'col-sm-3',
                    textI18n: 'products-page.product.name',
                    placeholderI18n: 'products-page.product.name'
                }
            ]
        };
    }

   /* formatExpenseConcept(expense_concept) {
        let concept = '';
        switch (expense_concept) {
            case 'CB':
                concept = 'Canasta Basica';
                break;
            case 'IN':
                concept = 'Insumo';
                break;
            case 'SR':
                concept = 'Servicio';
                break
            default:
                break;
        }
        return concept;
    }*/

    formatCategoriesColumn(product: ProductModel) {
        const {category_name} = product;
        return category_name ? `${category_name.name}`: product.category_name;
    }
}
