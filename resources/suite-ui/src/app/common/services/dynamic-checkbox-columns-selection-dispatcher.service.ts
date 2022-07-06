import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface CheckboxItem {
  id: string;
  checked: boolean;
}

@Injectable()
export class DynamicCheckboxColumnsSelectionDispatcherService {
  private _parentStateDispatcher: Subject<boolean> = new Subject();

  private _childrenCheckboxesStateCache: { [key: string]: CheckboxItem } = {};
  private _childrenStateDispatcher: Subject<CheckboxItem[]> = new Subject();

  public parentCheckboxState$ = this._parentStateDispatcher.asObservable();
  public childrenCheckboxesState$ = this._childrenStateDispatcher.asObservable();

  constructor() {}

  /**
   * Send an event to notify when the parent
   * checkbox is checked
   * @param checkEvent Event value
   */
  notifyParentCheckEvent(checkEvent: boolean) {
    this._parentStateDispatcher.next(checkEvent);
  }

  /**
   * Register a new child column to the dispatcher service's
   * children's state cache
   *
   * This inner cache will be used to keep track of every children's
   * checked state
   * @param childColumn Child column information
   */
  registerChildColumn(childColumn: CheckboxItem) {
    this._childrenCheckboxesStateCache[childColumn.id] = childColumn;
  }

  /**
   * Unregister a child column from the dispatcher service's children
   * state cache
   *
   * Useful when a children has been disabled or hidden, so we shouldn't
   * keep track of its state any longer
   * @param childColumn Child column information
   */
  unregisterChildColumn(childColumn: CheckboxItem) {
    delete this._childrenCheckboxesStateCache[childColumn.id];

    this._childrenStateDispatcher.next(this.toArray());
  }

  /**
   * Send an event to notify when a check event
   * happens in a child
   * @param childColumn Child column information
   */
  notifyChildrenCheckEvent(childColumn: CheckboxItem) {
    this._childrenCheckboxesStateCache[childColumn.id] = childColumn;

    this._childrenStateDispatcher.next(this.toArray());
  }

  /**
   * Helper method. The inner cache is a dictionary because it's easier
   * to add/remove values from it. This converts it to an array making
   * it easier to iterate over the items
   */
  private toArray() {
    return Object.keys(this._childrenCheckboxesStateCache).map(
      k => this._childrenCheckboxesStateCache[k]
    );
  }
}
