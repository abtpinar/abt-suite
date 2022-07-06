import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';

import {
  CALENDAR_DEFAULT_YEAR_RANGE,
  CALENDAR_LOCALIZATION
} from 'src/app/common/models/CalendarLocalization';
import { FilterInput } from 'src/app/common/components/base-table/base-table-config';
import { Observable, Subscription } from 'rxjs';
import { LanguageService } from 'src/app/i18n/services/language.service';

// To use jquery function in component
declare var $: any;

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html'
})
export class DateFilterComponent implements OnInit, OnDestroy {
  defaultYearRange = CALENDAR_DEFAULT_YEAR_RANGE;
  calendarLocalization = CALENDAR_LOCALIZATION;

  filterValue: string[];

  @Input()
  public filterInput: FilterInput;

  @Input() clear: Observable<boolean>;

  clearFilterSubscription$: Subscription;

  @Output()
  public dataEvent = new EventEmitter();

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    if (this.clear) {
      this.clearFilterSubscription$ = this.clear.subscribe(() => {
        this.filterValue = null;
      });
    }

    var selector = '[data-toggle="flatpickr-' + this.filterInput.field + '"]'
    var dataEvent = this.dataEvent;

    $(document).ready(() => {
      "use strict";
      var Flatpickr = function () {
        var a = $(selector);
            var e;
            e = {dateFormat: 'd/m/Y', mode: void 0 !== a.data("flatpickr-mode") ? a.data("flatpickr-mode") : "single", locale: { rangeSeparator: ' - ' }}, a.flatpickr(e)
            
            a.on("change", function(item) { 
              dataEvent.emit({
                target: { value: item && item.target.value ? item.target.value : '' }
              });
           });
      }();
    });
  }

  ngOnDestroy() {
    if (this.clearFilterSubscription$)
      this.clearFilterSubscription$.unsubscribe();
  }

  onDateEvent(date: Date) {
    if (this.filterValue.every(val => !!val)) {
      this.dataEvent.emit({ target: { value: this.filterValue.join('::') } });
    } else {
      // If only one day is selected on the calendar range
      // Use the same day as a start and end date
      const [year, month, day] = this.filterValue[0].split('-');
      this.filterValue[1] = `${year}-${month}-${day}`;
      this.dataEvent.emit({ target: { value: this.filterValue.join('::') } });
    }
  }

  onClearDateClick() {
    this.filterValue = null;
    this.dataEvent.emit({ target: { value: '' } });
  }
}
