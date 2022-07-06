import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { IEntity } from '../../../models/IEntity';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// To use jquery function in component
declare var $: any;

const SELECT_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'app-select',
  template: `
  
  <select class="form-control" [id]="prop" [attr.name]="prop"
  [attr.data-toggle]="'select-' + prop"
  [class.is-invalid]="invalidClass"
    [ngModel]="value" 
    [compareWith]="compareFn" 
    (ngModelChange)="selectEntity($event)">

    <!--<option *ngIf="!showDefault" disabled [value]="null"></option>-->
    <option *ngIf="showDefault" [value]="null">Todos</option>
    <ng-container #outlet></ng-container>
  <ng-template #content>
    <option *ngFor="let entity of entities" 
            [value]="idProp ? entity[idProp] : entity['id']">
            {{ !useTemplate ? entity[displayProp] : getDisplayProp(entity) }}
            </option>
    </ng-template>
    </select>
  `,
  providers: [SELECT_ACCESOR]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input()
  value: IEntity = null;

  private onTouch: Function;
  private onModelChange: (value: IEntity) => void = () => {};

  @Input()
  useTemplate: boolean = false;

  @Input()
  showDefault: boolean = false;

  @Input()
  invalidClass: boolean = false;

  @Input()
  allowClear: boolean = false;

  @Input()
  placeholder: string = 'Seleccione...';

  @Input()
  prop: string;

  @Input()
  idProp: string;

  @Input()
  displayProp: string;

  @Input()
  entities: IEntity[];

  @Output()
  onSelectedEntity = new EventEmitter();

  @ViewChild("outlet", {read: ViewContainerRef}) outletRef: ViewContainerRef;
  @ViewChild("content", {read: TemplateRef}) contentRef: TemplateRef<any>;

  writeValue(value: IEntity): void { 
    // if (this.prop == 'ptobacco_family')
    //   console.log(this.prop + '::', value);
    if (value) {
      if (!(value instanceof Object)) {
        this.value = value;
      }
      if (value instanceof Object && !this.idProp) {
        if (value.hasOwnProperty('id'))
          this.value = value['id'];
        else
        this.value = value['data']['id'];
      }
      if (value instanceof Object && this.idProp && value.hasOwnProperty(this.idProp)) {
        this.value = value[this.idProp];
      }
      if (value instanceof Object && this.idProp && !value.hasOwnProperty(this.idProp)) {
        value['data'][this.idProp];
      }

    } else
      this.value = null;    

    // this.outletRef.clear();
    // this.outletRef.createEmbeddedView(this.contentRef);
    // console.log('entities ===', this.entities);

      $('[data-toggle="select-' + this.prop + '"]').val(this.value).trigger('change');
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  selectEntity(selected) {
    this.value = selected ? (this.idProp ? selected : this.entities.find(element => element.id == selected)) : null;
    this.onSelectedEntity.emit(this.value);
    if (this.onTouch()) {
      this.onTouch();
    }
    this.onModelChange(this.value);
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
    $('[data-toggle="select-' + this.prop + '"]').val(this.value).trigger('change');
  }

  ngOnInit() {
    var selector = '[data-toggle="select-' + this.prop + '"]'
    // var pholder = this.languageService.translate(this.filterInput.placeholderI18n);
    var this_ = this;

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
                templateResult: t, allowClear: this_.allowClear, placeholder: this_.placeholder
            }, b.select2(d);
        // })
        b.on("change", function(item) {
          this_.selectEntity(item && item.target.value ? item.target.value : null);
       });
      }();

    });
  }

  compareFn(c1: IEntity, c2: IEntity): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  getDisplayProp(entity) {
    const value =  eval(this.displayProp);
    return value;
  }
}
