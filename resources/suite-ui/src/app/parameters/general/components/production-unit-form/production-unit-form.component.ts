import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { IEntity } from "src/app/common/models/IEntity";
import { TableCode } from "src/app/common/models/table-code.model";
import { CodeTablesService } from "src/app/common/services/code-tables.service";
import { parseNestedEntities } from "src/app/common/services/utils";
import { ProductionUnitModel } from "../../models/production-unit.model";


@Component({
  selector: 'app-production-unit-form',
  templateUrl: './production-unit-form.component.html'
})
export class ProductionUnitFormComponent implements OnInit, OnChanges, OnDestroy {

  isEdit = false;
  form: FormGroup = this.toFormGroup();

  subscriptions$: Subscription[] = [];

  @Input()
  entity: ProductionUnitModel;

  @Output()
  createEvent = new EventEmitter<ProductionUnitModel>();

  @Output()
  updateEvent = new EventEmitter<ProductionUnitModel>();

  @Output()
  cancelEvent = new EventEmitter();

  selectedType: TableCode;

  constructor(
    private formBuilder: FormBuilder,
    private codeTablesServices: CodeTablesService
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.entity) {
      if (!!this.entity.id) {
        this.isEdit = true;
      }
      this.entity = parseNestedEntities(this.entity);
      this.form.patchValue(this.entity);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
  }

  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: [null, Validators.required],
      name: [null, Validators.required],
      address: [null, Validators.required],
      president_name: [null, Validators.required],
      president_agreement_number: [null, Validators.required],
      bank: [null, Validators.required],
      bank_account: [null, Validators.required]
    });
  }

  prepareEntity(formValue) {
    const {
      code,
      name,
      address,
      president_name,
      president_agreement_number,
      bank,
      bank_account
    } = formValue;

    let entity = {
      id: this.isEdit ? this.entity.id : null,
      code,
      name,
      address,
      president_name,
      president_agreement_number,
      bank,
      bank_account
    };

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

}
