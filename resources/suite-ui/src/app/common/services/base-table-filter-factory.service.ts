import { Injectable } from '@angular/core';
import {
  FilterInput,
  FILTER_TYPE,
  FiltersConfiguration,
  BaseTableConfiguration
} from '../components/base-table/base-table-config';

export interface CacheableFilterData {
  [key: string]: { text: string; placeholder: string };
}

@Injectable({
  providedIn: 'root'
})
export class BaseTableFilterFactoryService {
  private filtersCache: CacheableFilterData;

  constructor() {}

  /**
   * Caches in filter data to use when building a select filter. This is useful because
   * it avoids having to pass the filter text and placeholder as parameters, which due to
   * localization can be a bit cumbersome
   *
   * @param filtersData Cacheable filter data. Contains only the text and placeholder which
   * varies widely due to localization
   */
  addFiltersDataToCache(filtersData: CacheableFilterData) {
    this.filtersCache = { ...this.filtersCache, ...filtersData };
  }

  /**
   * Builds a select filter using the cache to set the text and placeholder
   * and using the rest of the data sent in as parameters
   *
   * @param data The data for the select
   * @param filterName The filter name, as per the field property
   * @param className The class name. defaults to col-sm-4
   */
  buildSelectFilter<T>(
    data: T[],
    filterName: string,
    className: string = 'col-sm-4',
    disabled: boolean = false
  ): FilterInput {
    if (!this.filtersCache[filterName]) return null;

    return {
      type: FILTER_TYPE.SELECT,
      field: filterName,
      class: className,
      textI18n: this.filtersCache[filterName].text,
      placeholderI18n: this.filtersCache[filterName].placeholder,
      data,
      disabled: disabled
    };
  }

  /**
   * Builds a input filter using the cache to set the text and placeholder
   * and using the rest of the data sent in as parameters
   *
   * @param data The data for the select
   * @param filterName The filter name, as per the field property
   * @param className The class name. defaults to col-sm-4
   */
  buildInputFilter<T>(
    data: T[],
    filterName: string,
    className: string = 'col-sm-4'
  ): FilterInput {
    if (!this.filtersCache[filterName]) return null;

    return {
      type: FILTER_TYPE.TEXT,
      field: filterName,
      class: className,
      textI18n: this.filtersCache[filterName].text,
      placeholderI18n: this.filtersCache[filterName].placeholder,
      data
    };
  }

  /**
   * Updates a single filter in the config's primary filters
   * @param filter The filter data
   * @param fieldname The filter name
   */
  updatePrimaryFilter(
    configBase: FiltersConfiguration,
    filter: FilterInput,
    fieldname: string
  ): FiltersConfiguration {
    const filterIndex = configBase.filters.findIndex(
      item => item.field === fieldname
    );

    const { filters, additionalFilters } = configBase;

    let newFilters = [...filters];

    newFilters[filterIndex] = filter;

    return {
      filters: newFilters,
      additionalFilters
    };
  }

  /**
   * Updates a single filter in the config's additional filters
   * @param filter The filter data
   * @param fieldname The filter name
   */
  updateAdditionalFilter(
    configBase: FiltersConfiguration,
    filter: FilterInput,
    fieldname: string
  ): FiltersConfiguration {
    const filterIndex = configBase.additionalFilters.findIndex(
      item => item.field === fieldname
    );

    const { filters, additionalFilters } = configBase;

    // get config class
    const oldFilter = additionalFilters.find(item => item.field === fieldname);
    filter.class = oldFilter && oldFilter.class ? oldFilter.class : filter.class;

    let newFilters = [...additionalFilters];

    newFilters[filterIndex] = filter;

    return {
      filters,
      additionalFilters: newFilters
    };
  }

  updateFilterInTableConfig(
    data: any[],
    baseConfig: BaseTableConfiguration,
    filterName: string,
    loading: boolean = false,
    filterType: 'primary' | 'additional' = 'additional',
    filterClass: string = 'col-sm-4',
    disabled?: boolean
  ): BaseTableConfiguration {
    // Gets a filter using the freshly loaded data
    const updatedFilter = this.buildSelectFilter(
      data,
      filterName,
      filterClass,
      disabled
    );

    // Gets a FiltersConfiguration object that includes the updatedFilter
    let searchConfig;
    if (filterType === 'primary') {
      searchConfig = this.updatePrimaryFilter(
        baseConfig.searchConfig,
        { ...updatedFilter, loading },
        filterName
      );
    } else {
      searchConfig = this.updateAdditionalFilter(
        baseConfig.searchConfig,
        { ...updatedFilter, loading },
        filterName
      );
    }

    // Update the component's table config
    return { ...baseConfig, searchConfig };
  }
}
