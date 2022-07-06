import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy
} from '@angular/core';
import {
  FilterInput,
  SelectFilterInput
} from 'src/app/common/components/base-table/base-table-config';
import { Observable, Subscription } from 'rxjs';
import {LanguageService} from '../../../../../i18n/services/language.service';

// To use jquery function in component
declare var $: any;

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html'
})
export class SelectFilterComponent implements OnInit, OnDestroy {
  @Input() public filterInput: SelectFilterInput;
  @Input() clear: Observable<boolean>;
  @Output() public dataEvent: EventEmitter<any> = new EventEmitter();

  filterValue = null;

  clearFilterSubscription$: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    if (this.clear) {
      this.clearFilterSubscription$ = this.clear.subscribe(() => {
        this.filterValue = null;
        var a = $('[data-toggle="select-' + this.filterInput.field + '"]');
        a.val(null).trigger('change');
      });
    }

    var selector = '[data-toggle="select-' + this.filterInput.field + '"]'
    var pholder = this.languageService.translate(this.filterInput.placeholderI18n);
    var dataEvent = this.dataEvent;
    var value = this.filterValue;

    $(document).ready(() => {
      "use strict";
      var Select2 = function () {
        var a = $(selector);
    
        function t(a) {
            if (!a.id)return a.text;
            var e = $(a.element).data("avatar-src");
            return e ? $('<span class="avatar avatar-xs mr-3"><img class="avatar-img rounded-circle" src="' + e + '" alt="' + a.text + '"></span><span>' + a.text + "</span>") : a.text
        }
    
        // a.length && a.each(function () {
            var b, d;
            b = a, d = {
                dropdownParent: b.closest(".modal").length ? b.closest(".modal") : $(document.body),
                minimumResultsForSearch: b.data("minimum-results-for-search"),
                templateResult: t, allowClear: true, placeholder: pholder
            }, b.select2(d);
        // })
        a.on("change", function(item) { 
          value = item.target.value;
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

  onSelect(item) {
    console.log('item', item);
    console.log('filterValue', this.filterValue);
    item['id'] = this.filterValue;
    if (!this.filterInput.multipleSelection) {
      this.dataEvent.emit({
        target: { value: item && item.id ? item.id : '' }
      });
    } else {
      const value = (item as any[]).map(v => v.id).join(',');
      this.dataEvent.emit({ target: { value } });
    }
  }

  getValue(data: any): string {
    if (data.value !== undefined) {
      return data.value;
    } else if (data.id !== undefined) {
      return data.id;
    }

    return '';
  }

  getLabel(data: any): string {
    if (data.labelI18n !== undefined) {
      return this.languageService.translate(data.labelI18n);
    } else if (data.name !== undefined) {
      return data.name;
    } else if (data.label !== undefined) {
      return data.label;
    }

    return '';
  }
}
