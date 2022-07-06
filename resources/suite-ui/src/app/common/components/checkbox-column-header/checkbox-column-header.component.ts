import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  DynamicColumnHeaderDataAccesor,
  Column
} from '../base-table/base-table-config';
import { DynamicCheckboxColumnsSelectionDispatcherService } from '../../services/dynamic-checkbox-columns-selection-dispatcher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkbox-column-header',
  template: `
  <div
  class="custom-control custom-checkbox table-checkbox">
                          <input type="checkbox" class="custom-control-input" 
                          [(ngModel)]="checkboxValue" name="checkboxValue" id="selectAll" (change)="onchecked($event)">
                          <label class="custom-control-label" for="selectAll">
                            &nbsp;
                          </label>
                        </div>
  `
})
export class CheckboxColumnHeaderComponent
  implements OnInit, OnDestroy, DynamicColumnHeaderDataAccesor {
  columnData: Column;

  checkboxValue: boolean = false;

  childrenStateSubs$: Subscription;

  constructor(
    private selectionDispatcher: DynamicCheckboxColumnsSelectionDispatcherService
  ) {}

  ngOnInit() {
    // On init we subscribe to the state of all the child checkboxes
    this.childrenStateSubs$ = this.selectionDispatcher.childrenCheckboxesState$.subscribe(
      childColumnsState => {
        // If we have any checkboxes at all
        if (childColumnsState.length > 0) {
          // Update our local state. The parent checkbox should be
          // shown as checked if every single child checkbox is checked
          // The opposite applies as well, it should not be shown as checked
          // if at least a single item is unchecked
          this.checkboxValue = childColumnsState.every(
            childState => childState.checked
          );
        }
        // If we don't have any child checkboxes and our local state
        // is set to 'checked', it means it's residual state from eliminating
        // all the children after a change to their state
        else if (childColumnsState.length === 0 && this.checkboxValue) {
          // Clean up our residual state.
          // It's within a setTimeout function so it executes on the next tick()
          // thus preventing 'Expression changed after it has been checked' errors
          // within the angular's context
          setTimeout(() => {
            this.checkboxValue = false;
          });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.childrenStateSubs$.unsubscribe();
  }

  onchecked(event) {
    // Whenever the parent checkbox is clicked, we send an event
    // via the dispatcher service to notify all the children
    this.selectionDispatcher.notifyParentCheckEvent(event.target.checked);
  }
}
