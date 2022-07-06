import { Component, OnInit, Optional, OnDestroy } from '@angular/core';
import {
  DynamicColumnHeaderDataAccesor,
  Column
} from '../base-table/base-table-config';
import { LanguageService } from '../../../i18n/services/language.service';

@Component({
  selector: 'app-link-column-header',
  template: `
      <span *ngIf="columnData.sortable">
        {{ formatHeaderLabel(columnData) }}
      </span>
      <a class="text-muted" *ngIf="!columnData.sortable">
        {{ formatHeaderLabel(columnData) }}
      </a>
  `
})
export class LinkColumnHeaderComponent implements OnInit, DynamicColumnHeaderDataAccesor {
  columnData: Column;

  format: string;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.format = 'txt';
  }

  formatHeaderLabel(column: Column) {
      return column.fieldI18nKey
        ? this.languageService.translate(column.fieldI18nKey)
        : column.field;
  }
}
