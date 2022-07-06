import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { parseNestedEntities } from "src/app/common/services/utils";
import { MobileBrandModel } from "../../models/mobile-brand.model";
import { MobileModelModel } from "../../models/mobile-model.model";
import { MobileModel } from "../../models/mobile.model";


@Component({
  selector: 'app-mobile-form',
  templateUrl: './mobile-form.component.html'
})
export class MobileFormComponent implements OnInit, OnChanges, OnDestroy {

  isEdit = false;
  form: FormGroup = this.toFormGroup();

  subscriptions$: Subscription[] = [];

  @Input()
  entity: MobileModel;

  @Input()
  availableBrands: MobileBrandModel[];

  @Input()
  availableModels: MobileModelModel[];

  @Output()
  createEvent = new EventEmitter<MobileModel>();

  @Output()
  updateEvent = new EventEmitter<MobileModel>();

  @Output()
  cancelEvent = new EventEmitter();

  selectedBrand: number;

  isNewBrand: boolean;
  isNewModel: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.entity) {
      this.isEdit = !!this.entity.id;
      this.entity = parseNestedEntities(this.entity);
      this.form.patchValue(this.entity);
      
    }

    if (this.availableBrands && this.availableBrands.length == 0) {
      this.isNewBrand = true;
      this.isNewModel = true;
    }

    if (this.availableModels && this.availableModels.length > 0 && this.isEdit) {
      const model = this.availableModels.find(item => item.id == this.entity.mobile_model_id);
      this.form.get('brand').setValue(model.mobile_brand_id);
      this.selectedBrand = model.mobile_brand_id;
      this.form.get('model').setValue(model.id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
  }

  get availableFilteredModels() {
    if (this.selectedBrand)
      return this.availableModels.filter(element => element.mobile_brand_id == this.selectedBrand);
    return [];
  }

  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      imei: [null, Validators.required],
      imei2: [null],
      mac: [null, Validators.required],
      brand: [null, Validators.required],
      model: [null, Validators.required]
    });
  }

  prepareEntity(formValue) {
    const {
      imei,
      imei2,
      mac,
      brand,
      model
    } = formValue;

    let entity: MobileModel = {
      id: this.isEdit ? this.entity.id : null,
      imei,
      imei2,
      mac
    };

    if (this.isNewBrand)
      entity = { ...entity, brand, model };
    else if (this.isNewModel)
      entity = { ...entity, mobile_brand_id: brand, model };
    else
      entity = { ...entity, mobile_model_id: model };

    return entity;
  }

  onSave(form: FormGroup): void {
    const { valid } = form;

    if (valid) {
      const entity = this.prepareEntity(form.value);

      if (!this.isEdit) {
        this.createEvent.emit(entity);
      } else {
        this.updateEvent.emit(entity);
      }
    }
  }

  handleModels(event) {
    this.selectedBrand = event;
    this.form.get('model').setValue(null);
  }

  handleNewBrand() {
    this.isNewBrand = true;
    this.isNewModel = true;
  }

}
