import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BaseButton, BaseTableConfiguration, Column} from './base-table-config';
import {ServerPaginationInfo} from '../../models/ServerPaginationInfo';
import {isArray, isNullOrUndefined} from 'util';
import {LanguageService} from 'src/app/i18n/services/language.service';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectDownloadInProgress} from '../../../@rootStore/selectors';
import {SharedState} from '../../../@rootStore/reducers/shared.reducer';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.sass']
})
export class BaseTableComponent implements OnInit, OnChanges {
  defaultMaxCols = 0;
  defaultAutolayout = true;

  private sortInfo: {
    field: string;
    order: string;
  } = {
    field: '',
    order: ''
  };

  private sortInfoDispatcher$: Subject<{
    field: string;
    order: string;
  }> = new Subject();
  sortInfo$: Observable<{
    field: string;
    order: string;
  }> = this.sortInfoDispatcher$.asObservable();

  @Input()
  isModal: boolean = false;

  @Input()
  configuration: BaseTableConfiguration;

  @Input()
  paginationInfo: ServerPaginationInfo;

  @Input()
  isLoading: boolean;

  @Input()
  data: any[];

  @Input()
  showInSection: boolean = false;

  @Output()
  pageRequest = new EventEmitter();

  @Output()
  itemEdit = new EventEmitter();

  @Output()
  searchRequest = new EventEmitter();

  @Output()
  clearRequest = new EventEmitter();

  @Output()
  searchInputChange = new EventEmitter();

  @Output()
  rowExpand = new EventEmitter();

  @Output()
  additionalFiltersToggle = new EventEmitter();

  actionsHeader = 'table-actions';

  public isDownloadingFile$: Observable<boolean>;

  constructor(private languageService: LanguageService,
              private store$: Store<SharedState>) {}

  ngOnInit() {
    if (this.configuration.showRowActionsFirst) {
      this.configuration.actionRowPositionIndex = 1;
    } else if (
      !this.configuration.showRowActionsFirst &&
      isNullOrUndefined(this.configuration.actionRowPositionIndex)
    ) {
      this.configuration.actionRowPositionIndex = this.configuration.columns.length;
    }

    this.isDownloadingFile$ = this.store$.pipe(
      select(selectDownloadInProgress)
    );


  }

  ngOnChanges() {
  }

  getHeaderTitle(column) {
    return this.languageService.translate(column.fieldI18nKey);
  }

  formatColumnValue(column: Column, row: any) {
    if (column.formatRow) {
      return column.formatRow(row);
    }
    if (column.format) {
      return column.format(row[column.field]);
    }
    return row[column.field];
  }

  get shouldDisplayHeader() {
    if (
      (this.configuration.actionButtons &&
        this.configuration.actionButtons.length > 0) ||
      this.configuration.searchConfig ||
      this.paginationInfo
    ) {
      return true;
    } else {
      return false;
    }
  }

  showActionButton(actionButton: BaseButton) {
    if (!!actionButton.isVisible) {
      return actionButton;
    }
    return true;
  }

  get containerClasses() {
    if (isArray(this.configuration.containerClasses)) {
      return (this.configuration.containerClasses as string[]).join(' ');
    } else if (!!this.configuration.containerClasses) {
      return this.configuration.containerClasses;
    }
    return 'box';
  }

  get totalColumns() {
    return this.configuration.rowActionButtons &&
      this.configuration.rowActionButtons.length > 0
      ? this.configuration.columns.length + 1
      : this.configuration.columns.length;
  }

  hasActionRow() {
    return (
        this.configuration.rowActionButtons &&
        this.configuration.rowActionButtons.length > 0
    );
  }

  hasActionGroupRow() {
    return (
        this.configuration.rowActionButtonsGroup &&
        this.configuration.rowActionButtonsGroup.length > 0
    );
  }

  fireActionButtonEvent(item, button: BaseButton) {
    button.callback(item);
  }

  requestPage(pageChangeEvent: any/*PageChangedEvent*/) {
    this.pageRequest.emit(pageChangeEvent);
  }

  requestEdit(data) {
    this.itemEdit.emit(data);
  }

  conditionalClasses(data) {

    if (this.configuration.conditionalRowClass == null)
      return '';

    let value = eval("data." + this.configuration.conditionalRowClass.condition);
    return value ? this.configuration.conditionalRowClass.class : this.configuration.conditionalRowClass.alternClass;
  }

  rowDidExpand(rowData) {
    this.rowExpand.emit(rowData);
  }

  getTotalColumns(): Column<any>[] {
    // if (this.hasActionRow()) {
    //   // console.log('before', this.configuration.columns);
    //   const actionRowIndex = this.configuration.actionRowPositionIndex - 1;
    //   const columns = [...this.configuration.columns];
    //   columns.splice(actionRowIndex, 0, {
    //     field: 'PLACEHOLDER'
    //   });

    //   // console.log('cols', columns);

    //   return columns;
    // } else {
      return this.configuration.columns;
    // }
  }

  getRowActionButtonColor(button: BaseButton, data) {
    if (button.classFn) {
      return button.classFn(data);
    } else if (button.class) {
      return button.class;
    } else return '';
  }

  getRowActionButtonIsVisible(button: BaseButton, data) {
    if (button.visibleFn) {
      return button.visibleFn(data);
    } else if (!!button.isVisible) {
      return button.isVisible;
    } else return true;
  }

  getRowActionButtonIsDisabled(button: BaseButton, data) {
    if (button.disabledFn) {
      return button.disabledFn(data);
    } else if (!!button.isDisabled) {
      return button.isDisabled;
    } else return false;
  }

  formatRowActionButtonText(button: BaseButton, rowData) {
    if (button.dynamicText) {
      return button.dynamicText(rowData);
    }
    if (button.i18nKey) {
      return this.languageService.translate(button.i18nKey);
    }
    if (button.staticText) {
      return button.staticText;
    }
    return '';
  }

  calculateColumnWidth(column: Column) {
    if (!column.dynamicColumn) {
      const autolayout = this.configuration.autoLayout
        ? this.configuration.autoLayout
        : this.defaultAutolayout;

      const maxCols = this.configuration.maxLayoutCols
        ? this.configuration.maxLayoutCols
        : this.defaultMaxCols;

      if (autolayout && this.configuration.columns.length > maxCols) {
        const columnWidthStyle = {
          'min-width.px': column.minWidth ? column.minWidth : 150
        };
        return columnWidthStyle;
      }
    } else {
      const columnWidthStyle = column.minWidth
        ? {
            'min-width.px': column.minWidth
          }
        : {};
      return columnWidthStyle;
    }
  }

  serverSort(event: any/*SortEvent*/) {
    // The order from the event is either 1 or -1
    // But the server understands asc and desc
    let order = event.order > 0 ? 'asc' : 'desc';

    // The event sends on the field property the name of the
    // column being sorted, we need to access the configuration
    // to find that column and get the sortFieldName which is
    // the field the server understands
    const sortedColumn = this.configuration.columns.find(
      c => c.field === event.field
    );

    // Fallback to column's field property if the
    // sortFieldName is not found
    const field = sortedColumn.sortFieldName
      ? sortedColumn.sortFieldName
      : sortedColumn.field;

    if (field !== this.sortInfo.field) {
      order = 'asc';
    } else {
      order = this.sortInfo.order === 'asc' ? 'desc' : 'asc';
    }

    // Only trigger the sorting event if the sorting information has changed
    // wether on a different column or a different order
    // This is done to prevent a data re-loading cycle
    // due to an event trigger loop
    if (field !== this.sortInfo.field || order !== this.sortInfo.order) {
      this.sortInfo = { field, order };
      this.sortInfoDispatcher$.next(this.sortInfo);
    }
  }

  showExpandIndicator(data) {

    if (this.configuration.rowExpansionConfig.showConditionalFunc) {
      let value = eval("data." + this.configuration.rowExpansionConfig.showConditionalFunc);
      return !!value;
    }

    return true;
  }

  hasCheckbox() {
    return this.configuration.columns.find(item => (item.hasOwnProperty('dynamicColumn') && item.dynamicColumn.hasOwnProperty('selected')));
  }

}
