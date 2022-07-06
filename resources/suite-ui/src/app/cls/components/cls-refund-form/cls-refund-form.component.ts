import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { formatDecimal } from "src/app/common/components/formats";
import { TableCode } from "src/app/common/models/table-code.model";
import { CLModel, CLStates } from "../../models/cl.model";
import { CLsConfigService } from "../../services/cls-config.service";


@Component({
  selector: 'app-cls-refund-form',
  templateUrl: './cls-refund-form.component.html'
})
export class CLsRefundFormComponent implements OnInit, OnChanges, OnDestroy {

  isEdit = false;
  form: FormGroup = this.toFormGroup();

  @Input()
  entities: CLModel[];

  @Input()
  availableRefundMotives: TableCode[];

  @Output() 
  createEvent = new EventEmitter<any>();

  @Output()
  cancelEvent = new EventEmitter();

  subscriptions$: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public configService: CLsConfigService
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['entities'] && this.entities) {
    //   this.rebuildCLsForm(this.entities);
    // }
    // if (this.entity) {
    //   if (!!this.entity.id) {
    //     this.isEdit = true;
    //     this.handleGroups(this.entity.type);
    //   }      
    //   this.entity = parseNestedEntities(this.entity);
    //   this.form.patchValue(this.entity);
    // }
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
  }

  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      motive: [null, [Validators.required]],
      description: [null]
    });
  }

  onSave(form: FormGroup): void {
    const {valid} = form;

    if (valid) {
      const entity = this.prepareEntity(form.value);

      if (!this.isEdit) {
        this.createEvent.emit(entity);
      }
    }
  }

  prepareEntity(formValue) {
    const {
      motive,
      description
    } = formValue;

    let refunds = [];
    if (this.entities[0].refunds) {
      refunds = JSON.parse(this.entities[0].refunds);
    }
    const newRefunds = [...refunds, {motive, description, date: new Date()}];

    return {      
      id: this.entities[0].id,
      refunds: JSON.stringify(newRefunds),
      expense: 0,
      status: CLStates.Refunded 
    };
  }

}
