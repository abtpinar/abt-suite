import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { TableCode } from "src/app/common/models/table-code.model";
import { parseNestedEntities } from "src/app/common/services/utils";
import { ProductionUnitModel } from "src/app/parameters/general/models/production-unit.model";
import { FarmerModel } from "../../models/farmer.model";


@Component({
  selector: 'app-farmer-form',
  templateUrl: './farmer-form.component.html',
  styleUrls: ['./farmer-form.component.sass']
})
export class FarmerFormComponent implements OnInit, OnChanges, OnDestroy {

  isEdit = false;
  farmerForm: FormGroup = this.toFormGroup();

  subscriptions$: Subscription[] = [];

  @Input()
  farmer: FarmerModel;

  @Input()
  availableUnits: ProductionUnitModel[];

  @Output()
  create = new EventEmitter<FarmerModel>();

  @Output()
  update = new EventEmitter<FarmerModel>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.farmer) {
      this.isEdit = !!this.farmer.id;
      this.farmer = parseNestedEntities(this.farmer);
      this.farmerForm.patchValue(this.farmer);
    }

    if (changes['availableUnits'].currentValue) {
      console.log(changes['availableUnits'].currentValue);
      if (this.isEdit) {
        this.farmerForm.get('production_unit_id').setValue(this.farmer.production_unit_id);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
  }

  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: [null],
      first_name: [null, Validators.required],
      middle_name: [null, Validators.required],
      last_name: [null, Validators.required],
      telephone_number: [null],
      production_unit_id: [null, Validators.required],
      ci: [null, Validators.required],
      cup_card: [null],
      mlc_card: [null]
    });
  }

  prepareEntity(formValue) {
    const {
      code,
      first_name,
      middle_name,
      last_name,
      telephone_number,
      production_unit_id,
      ci,
      cup_card,
      mlc_card
    } = formValue;

    let entity = {
      id: this.isEdit ? this.farmer.id : null,
      code,
      first_name,
      middle_name,
      last_name,
      telephone_number,
      production_unit_id,
      ci,
      cup_card,
      mlc_card
    };

    return entity;
  }

  onSave(form: FormGroup): void {
    const { valid } = form;

    if (valid) {
      const entity = this.prepareEntity(form.value);

      if (!this.isEdit) {
        this.create.emit(entity);
      } else {
        this.update.emit(entity);
      }
    }
  }

}
