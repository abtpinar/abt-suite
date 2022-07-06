import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { parseNestedEntities } from "src/app/common/services/utils";
import { SimModel } from "../../models/sim.model";


@Component({
  selector: 'app-sim-form',
  templateUrl: './sim-form.component.html'
})
export class SimFormComponent implements OnInit, OnChanges, OnDestroy {

  isEdit = false;
  form: FormGroup = this.toFormGroup();

  subscriptions$: Subscription[] = [];

  @Input()
  entity: SimModel;

  @Output()
  createEvent = new EventEmitter<SimModel>();

  @Output()
  updateEvent = new EventEmitter<SimModel>();

  @Output()
  cancelEvent = new EventEmitter();

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
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
  }

  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      number: [null, Validators.required],
      ip_address: [null],
      pin: [null, Validators.required],
      puk: [null, Validators.required],
      usim: [false, Validators.required]
    });
  }

  prepareEntity(formValue) {
    const {
      number,
      pin,
      puk,
      ip_address,
      usim
    } = formValue;

    let entity: SimModel = {
      id: this.isEdit ? this.entity.id : null,
      number,
      pin,
      puk,
      ip_address,
      usim,
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
