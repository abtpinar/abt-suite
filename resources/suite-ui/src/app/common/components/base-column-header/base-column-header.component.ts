import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { Column } from '../base-table/base-table-config';
import { LanguageService } from 'src/app/i18n/services/language.service';

@Component({
  selector: 'app-base-column-header',
  template: `
    <ng-container *ngIf="!isDynamic">
      <span *ngIf="column.sortable">
        {{ formatHeaderLabel(column) }}
      </span>
      <a class="text-muted" *ngIf="!column.sortable">
        {{ formatHeaderLabel(column) }}
      </a>      
    </ng-container>
    <ng-container #dynamicHeaderContainer></ng-container>
  `
})
export class BaseColumnHeaderComponent implements OnInit {
  @Input() isDynamic: boolean;

  @Input() column: Column;

  @Input() rowData: any;

  @ViewChild('dynamicHeaderContainer', { read: ViewContainerRef })
  dynamicHeaderContainer: ViewContainerRef;

  constructor(
    private languageService: LanguageService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    if (this.column.dynamicHeader) {
      this.isDynamic = true;
      this.renderDynamicComponent();
    }
  }

  renderDynamicComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.column.dynamicHeader.dynamicComponentInstance
    );
    const viewContainerRef = this.dynamicHeaderContainer;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.columnData = this.column;
  }

  formatHeaderLabel(column: Column) {
    if (!column.dynamicHeader && !column.dynamicColumn) {
      return column.fieldI18nKey
        ? this.languageService.translate(column.fieldI18nKey)
        : column.field;
    } else {
      return '';
    }
  }
}
