import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { IEntity } from '../../../models/IEntity';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { globalFormatDate, parseDateFromString } from '../../formats';
import { ENGINE_METHOD_CIPHERS } from 'constants';

// To use jquery function in component
declare var $: any;

const CALENDAR_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarComponent),
  multi: true
};

@Component({
  selector: 'app-calendar',
  template: `
  <input type="text" class="form-control" [id]="prop"
  [attr.data-toggle]="'flatpickr-' + prop"
    [ngModel]="value"
    (ngModelChange)="selectDate($event)"> 
  `,
  providers: [CALENDAR_ACCESOR]
})
export class CalendarComponent implements OnInit, ControlValueAccessor {

  @Input()
  value: string = null;

  private onTouch: Function;
  private onModelChange: (value: string) => void = () => { };

  @Input()
  invalidClass: boolean = false;

  @Input()
  allowClear: boolean = false;

  @Input()
  placeholder: string = 'Seleccione...';

  @Input()
  prop: string;

  @Input()
  minDate: string;

  @Input()
  maxDate: string;

  @Output()
  onSelectedEntity = new EventEmitter();

  writeValue(value: string): void {
    this.value = value;    
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  selectDate(selected) {
    this.value = selected ? selected : null;
    this.onSelectedEntity.emit(this.value);
    if (this.onTouch()) {
      this.onTouch();
    }
    this.onModelChange(this.value);
  }

  constructor() { }

  ngOnInit() {
    var selector = '[data-toggle="flatpickr-' + this.prop + '"]'
    // var pholder = this.languageService.translate(this.filterInput.placeholderI18n);
    var this_ = this;

    $(document).ready(() => {
      "use strict";
      var Flatpickr = function () {
        var a = $(selector);
        var e;
        e = {
          mode: void 0 !== a.data("flatpickr-mode") ? a.data("flatpickr-mode") : "single",
          dateFormat: "Y-m-d",
          locale: {
            weekdays: {
              shorthand: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            },
            months: {
              longhand: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"]
            }
          }
        }, a.flatpickr(e)

        a.on("change", function (item) { 
          this_.selectDate(item && item.target.value ? item.target.value : null);
        });
      }();
    });
  }
}
