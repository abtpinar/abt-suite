import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { IEntity } from '../../../models/IEntity';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { globalFormatDate, parseDateFromString } from '../../formats';
import { ENGINE_METHOD_CIPHERS } from 'constants';

// To use jquery function in component
declare var $: any;

const MASK_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MaskComponent),
  multi: true
};

@Component({
  selector: 'app-mask',
  template: `
  <input type="text" class="form-control" [id]="prop" [ngModel]="value"/> 
  `,
  providers: [MASK_ACCESOR]
})
export class MaskComponent implements OnInit, ControlValueAccessor {

  @Input()
  value: string = null;

  private onTouch: Function;
  private onModelChange: (value: string) => void = () => { };

  @Input()
  invalidClass: boolean = false;

  @Input()
  mask: string;

  @Input()
  placeholder: string;

  @Input()
  prop: string;

  writeValue(value: string): void {
    this.value = value;    
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  selectValue(selected) {
    this.value = selected ? selected : null;
    if (this.onTouch()) {
      this.onTouch();
    }
    this.onModelChange(this.value);
  }

  constructor() { }

  ngOnInit() {
    var selector = '#' + this.prop + '';
    var this_ = this;

    $(document).ready(() => {
      "use strict";
      $(selector).mask(
        this_.mask,
        {
          placeholder: this_.placeholder
        }
      );
      $(selector).on("change", function (item) { 
        this_.selectValue(item && item.target.value ? item.target.value : null);
      });
    });
  }
}
