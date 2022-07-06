import { TemplateRef } from '@angular/core';

export interface DynamicColumnDataAccesor {
  columnData: Column;
  rowData: any;
}

export interface DynamicColumnHeaderDataAccesor {
  columnData: Column;
}

export interface Column<T = any> {
  field: string;
  fieldI18nKey?: string;
  sortable?: boolean;
  sortFieldName?: string;
  style?: any;
  nowrap?: boolean;

  /**
   * Min column width (in pixels)
   * Only applied if total number of columns exceeds the configuration's
   * maxLayoutCols property
   * defaults to 150px
   */
  minWidth?: number;

  /**
   * Function to format the column's display value. Gets given the column's value and
   * must return a string with the desired value to show in the table
   */
  format?: (value: any) => string;

  /**
   * Function to format the column's display value. Gets given the entity's value and
   * must return a string with the desired value to show in the table
   */
  formatRow?: (value: T) => string;

  dynamicColumn?: {
    /**
     * A component instance to be dynamically rendered instead of the
     * default content. Must implement the DynamicColumnComponent interface
     */
    dynamicComponentInstance: {
      new (...args: any[]): DynamicColumnDataAccesor;
    };

    hidden?: (data: any) => boolean;
    disabled?: (data: any) => boolean;
    selected?: (data: any) => boolean;

    /**
     * This function can be used as a way to send some data out of the
     * dynamically rendered column component to be used outside the
     * base table
     */
    dynamicComponentDataOutput?: (data: any) => any;
  };

  dynamicHeader?: {
    /**
     * A component instance to be dynamically rendered instead of the
     * default content. Must implement the DynamicColumnComponent interface
     */
    dynamicComponentInstance: {
      new (...args: any[]): DynamicColumnHeaderDataAccesor;
    };

    /**
     * This function can be used as a way to send some data out of the
     * dynamically rendered column component to be used outside the
     * base table
     */
    dynamicComponentDataOutput?: (data: any) => any;
  };

  popoverData?: (value: T) => any;
}

export class BaseButton {
  staticText?: string;
  dynamicText?: (data?: any) => string;
  i18nKey?: string;
  icon?: string;
  class?: string;
  classFn?: (data?: any) => string;
  tooltipI18nKey?: string;
  isVisible?: boolean;
  isDisabled?: boolean;
  modalId?: string;
  callback?: Function;

  visibleFn?: (data?: any) => boolean;
  disabledFn?: (data?: any) => boolean;
}

export enum FILTER_TYPE {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  DATE = 'date'
}

export interface SelectFilterData {
  id: string;
  name: string;
}

export interface FilterInput {
  type: FILTER_TYPE;
  field: string;
  textI18n: string;
  placeholderI18n?: string;
  class?: string;
  data?: any;
  loading?: boolean;
  disabled?: boolean;
}

export interface SelectFilterInput extends FilterInput {
  type: FILTER_TYPE.SELECT;
  data: SelectFilterData[];
  multipleSelection?: boolean;
}

export interface FiltersConfiguration {
  filters: FilterInput[];
  additionalFilters?: FilterInput[];
}

export interface BaseTableConfiguration {
  actionRowPositionIndex?: number;
  columns: Column[];

  /**
   * Max number of cols after which the table will apply a min width to every column
   * Defaults to 9
   */
  maxLayoutCols?: number;

  /**
   * Dynamically calculate column widths based on their content
   * deafaults to true
   */
  autoLayout?: boolean;

  pageSizes?: number[];
  actionButtons?: BaseButton[];
  rowActionButtons?: BaseButton[];
  rowActionButtonsGroup?: BaseButton[];
  searchConfig?: FiltersConfiguration;
  noDataMessage?: string;
  confirmDeleteMessage?: string;
  confirmDeleteTitle?: string;
  deleteResultMessage?: string;
  useHeaderTemplate?: boolean;
  showRowActionsFirst?: boolean;

  containerClasses?: string | string[];
  rowExpansionConfig?: BaseTableRowExpansionConfig;

  conditionalRowClass?: ConditionalRowClass;
}

export interface ConditionalRowClass {
  condition?: string;
  class?: string;
  alternClass?: string;
}

export enum RowExpandMode {
  Multiple = 'multiple',
  Single = 'single'
}

export interface BaseTableRowExpansionConfig {
  /**
   * Key required to compare rows when in expansion mode
   */
  datasetTrackByKey: any;

  /**
   * Template reference to the dynamic content of the expansion row.
   * Also used to pass in the data context
   */
  templateRef: TemplateRef<any>;

  /**
   * Expandable rows display mode. Single or Multiple
   */
  displayMode?: RowExpandMode;

  showConditionalFunc?: any;
}
