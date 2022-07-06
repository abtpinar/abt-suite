import { Component, OnInit, Optional, OnDestroy } from '@angular/core';
import {
  DynamicColumnDataAccesor,
  Column
} from '../base-table/base-table-config';
import {Subscription} from 'rxjs/index';
import {finalize} from 'rxjs/internal/operators';

@Component({
  selector: 'app-link-column',
  template: `
  <!--<ng-template #popTemplate>    -->
    <!--<div class="row">-->
      <!--<div class="col-xs-12">-->
        <!--<strong><small><i class="fa fa-info-circle fa-fw"></i>{{ value }}</small></strong>-->
      <!--</div>-->
      <!--<div class="col-xs-12 text-center" *ngIf="isLoading" style="margin-top:10px;margin-bottom:5px;border-top:1px solid #ccc;">-->
          <!--<br>-->
          <!--<p><i class="fa fa-spin fa-refresh"></i></p>-->
      <!--</div>-->
        <!--<div *ngIf="!isLoading">-->
            <!--<div *ngFor="let item of data;" class="col-xs-{{ item.span }}" style="margin-top:10px;margin-bottom:5px;border-top:1px solid #ccc;">-->
                <!--<div><strong><small>{{ item.label | appTrans }}</small></strong></div>-->
                <!--<div *ngIf="item.value">{{ item.value }}</div>-->
                <!--<div *ngIf="!item.value">-</div>-->
            <!--</div>-->
        <!--</div>      -->
    <!--</div>-->
  <!--</ng-template>-->

  <!--<a (click)="onclick($event)" *ngIf="show"-->
     <!--[popover]="popTemplate"-->
     <!--triggers="mouseenter:mouseleave"-->
     <!--container="body"-->
     <!--(onShown)="onShown()" (onHidden)="onHidden()"-->
     <!--containerClass="customClass">{{ format }}</a>-->
  
  <a (click)="onclick($event)" *ngIf="!show" class="text-nowrap pointer">{{ format }}</a>`,
  styleUrls: ['./link-column.component.sass']
})
export class LinkColumnComponent implements OnInit, DynamicColumnDataAccesor {
  columnData: Column;
  rowData: any;

  format: string;

  isLoading: boolean = false;

  delay: number = 500;
  show: boolean = false;
  value: string;
  data: any;
  subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
    this.format = this.columnData.formatRow(this.rowData);
    this.value = this.columnData.formatRow(this.rowData);
    this.show = !!this.columnData.popoverData;
  }

  onclick(event) {
    // Whenever the checkbox is clicked, if the checkbox is not disabled
    const dataEvent = {
      columnData: this.columnData,
      rowData: this.rowData,
      event
    };

    // we call the data output function, using the dataEvent object.
    this.columnData.dynamicColumn.dynamicComponentDataOutput(dataEvent);
  }

  onShown(): void {
    this.isLoading = true;
    if (this.show) {
      const popover = this.columnData.popoverData(this.rowData);
      this.subscription = popover.query.pipe(finalize(() => {
        this.isLoading = false;
        this.subscription.unsubscribe();
      })).subscribe(response => {
          const item = (<any>response).response.data;
          this.data = [];
          popover.data.forEach(row => this.data.push({...row, value: item[row.property]}));
        });
    }
  }

  onHidden(): void {
    this.isLoading = false;
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
