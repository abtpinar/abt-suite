import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { Column } from '../base-table/base-table-config';

@Component({
  selector: 'app-base-column',
  template: `
    <p class="m-0"
      *ngIf="!isDynamic"
      [innerHTML]="formatColumnValue(column, rowData)"
    ></p>
    <ng-container #dynamicColumnContainer></ng-container>
  `
})
export class BaseColumnComponent implements OnInit {
  @Input() isDynamic: boolean;

  @Input() column: Column;

  @Input() rowData: any;

  @ViewChild('dynamicColumnContainer', { read: ViewContainerRef })
  dynamicColumnContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    if (this.column.dynamicColumn) {
      this.isDynamic = true;
      this.renderDynamicComponent();
    }
  }

  renderDynamicComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.column.dynamicColumn.dynamicComponentInstance
    );
    const viewContainerRef = this.dynamicColumnContainer;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.columnData = this.column;
    componentRef.instance.rowData = this.rowData;
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
}
