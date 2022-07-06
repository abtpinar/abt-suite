import {Type} from '@angular/core';
import {ActionButton} from './action-button';
import {Column} from './column';
import {RowActionButton} from './row-action-button';
import {DataAreaHeaderConfiguration} from './data-area-header-configuration';
import {DataAreaFiltersConfiguration} from './data-area-filters-configuration';

export class DataAreaConfiguration {
    public pageSize: number;
    public pageSizeSelector: number[];
    public pageRange: number;
    public showBoxContainer: boolean;
    public dataOperationsType: Type<any>;
    public columns: Column[];
    public actionButtons: ActionButton[];
    public rowActionButtons: RowActionButton<any>[];
    public headerConfiguration?: DataAreaHeaderConfiguration;
    public filtersConfiguration?: DataAreaFiltersConfiguration;
    public emptyMsgI18nKey?: string;
    public sureDeleteMsgI18nKey?: string;
    public sureDeleteTitleMsgI18nKey?: string;
    public deletedMsgI18nKey?: string;
    public isOnlyTable: boolean;
}
