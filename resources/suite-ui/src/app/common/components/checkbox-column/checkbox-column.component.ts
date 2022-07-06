import { Component, OnInit, Optional, OnDestroy } from '@angular/core';
import {
  DynamicColumnDataAccesor,
  Column
} from '../base-table/base-table-config';
import { DynamicCheckboxColumnsSelectionDispatcherService } from '../../services/dynamic-checkbox-columns-selection-dispatcher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkbox-column',
  template: `
  <div *ngIf="!isHidden"
  class="custom-control custom-checkbox table-checkbox">
                          <input type="checkbox" [disabled]="isDisabled" class="custom-control-input" 
                          [(ngModel)]="checkboxValue" name="checkboxValue" [id]="'select_' + rowData['id']" (change)="onchecked($event)">
                          <label class="custom-control-label" [attr.for]="'select_' + rowData['id']">
                            &nbsp;
                          </label>
                        </div>    
  `
})
export class CheckboxColumnComponent
  implements OnInit, OnDestroy, DynamicColumnDataAccesor {
  checkboxValue: boolean;

  columnData: Column;
  rowData: any;

  selectionSubs$: Subscription;

  // save disabled and hidden states locally to
  // prevent constant value recalculation via getters
  _isHidden: boolean = false;
  _isDisabled: boolean = false;

  constructor(
    @Optional()
    private selectionDispatcher: DynamicCheckboxColumnsSelectionDispatcherService
  ) {
    if (this.selectionDispatcher) {
      // subscribe to the parent checkbox's notifier, so whenever the parent is
      // checked/unchecked we perform the correct action locally to this
      // child checkbox updating its state
      this.selectionSubs$ = this.selectionDispatcher.parentCheckboxState$.subscribe(
        checkEvent => {
          if (!this.isHidden && !this.isDisabled) {
            this.checkboxValue = checkEvent;
            this.onchecked(checkEvent);
          }
        }
      );
    }
  }

  ngOnInit() {
    // console.log(this.rowData);
    // On init we register this child cehckbox so that the dispatcher
    // service is aware of it. And we only register it if it's not
    // disabled or hidden
    if (!this.isHidden && !this.isDisabled) {
      this.checkboxValue = this.columnData.dynamicColumn.selected(this.rowData);
      this.selectionDispatcher.registerChildColumn({
        id: this.rowData.id,
        checked: this.columnData.dynamicColumn.selected(this.rowData)
      });
    }
  }

  get isHidden() {
    // Getter for the hidden prop. Getters are constantly called on each
    // change detection cycle so we use it to see if the column's hidden
    // function resolves to a new value
    if (this.columnData.dynamicColumn.hidden) {
      // If the value is different than the one we already have
      // then we update accordingly, and we unregister from the dispatcher
      // service since this row doesn't need to be taken into account because
      // it's hidden
      const hidden = this.columnData.dynamicColumn.hidden(this.rowData);
      if (hidden !== this._isHidden) {
        this._isHidden = hidden;
        this.checkboxValue = this.columnData.dynamicColumn.selected(this.rowData);
        this.selectionDispatcher.unregisterChildColumn({
          id: this.rowData.id,
          checked: this.columnData.dynamicColumn.selected(this.rowData)
        });
      }
      // We return the inner value
      return this._isHidden;
    }

    // If the column doesn't have a hidden function to calculate the property
    // then we always return false to indicate that it's not hidden
    return false;
  }

  get isDisabled() {
    // Getter for the hidden prop. Getters are constantly called on each
    // change detection cycle so we use it to see if the column's disabled
    // function resolves to a new value
    if (this.columnData.dynamicColumn.disabled) {
      const disabled = this.columnData.dynamicColumn.disabled(this.rowData);
      // If the value is different than the one we already have
      // then we update accordingly, and we unregister from the dispatcher
      // service since this row doesn't need to be taken into account because
      // it's disabled
      if (disabled !== this._isDisabled) {
        this._isDisabled = disabled;
        this.checkboxValue = this.columnData.dynamicColumn.selected(this.rowData);
        this.selectionDispatcher.unregisterChildColumn({
          id: this.rowData.id,
          checked: this.columnData.dynamicColumn.selected(this.rowData)
        });
      }
      // We return the inner value
      return this._isDisabled;
    }

    // If the column doesn't have a disabled function to calculate the property
    // then we always return false to indicate that it's not disabled
    return false;
  }

  ngOnDestroy(): void {
    // Clean up the subscription
    this.selectionSubs$.unsubscribe();
  }

  onchecked(event) {
    if (event.hasOwnProperty('target'))
      event = event.target.checked; 
    // Whenever the checkbox is clicked, if the checkbox is not disabled
    if (!this.isDisabled) {
      const dataEvent = {
        columnData: this.columnData,
        rowData: this.rowData,
        event
      };

      // we call the data output function, using the dataEvent object.
      this.columnData.dynamicColumn.dynamicComponentDataOutput(dataEvent);

      // We also notify the dispatcher service to notify the change in this
      // checkbox's state
      this.selectionDispatcher.notifyChildrenCheckEvent({
        id: this.rowData.id,
        checked: event
      });
    }
  }
}