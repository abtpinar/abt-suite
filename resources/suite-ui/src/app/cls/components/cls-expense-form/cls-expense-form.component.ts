import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { CLModel } from "../../models/cl.model";
import { CLsConfigService } from "../../services/cls-config.service";


@Component({
  selector: 'app-cls-expense-form',
  templateUrl: './cls-expense-form.component.html'
})
export class CLsExpenseFormComponent implements OnInit, OnChanges, OnDestroy {

  isEdit = false;
  form: FormGroup = this.toFormGroup();
  formCLs: FormArray = new FormArray([]);

  @Input()
  entities: CLModel[];

  @Input()
  showUnits: boolean;

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
    if (changes['entities'] && this.entities) {
      this.rebuildCLsForm(this.entities);
    }
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
    });
  }

  rebuildCLsForm(cls) {
    if (this.form.contains('cls'))
      this.form.removeControl('cls');

    this.formCLs = this.formBuilder.array(
      cls.map(farmer => this.createCLControl(farmer))
    );

    this.form.addControl('cls', this.formCLs);
  }

  createCLControl(cl: any) {
    return this.formBuilder.group({
      id: [cl.id],
      expense: [null, [Validators.required]]
    });
  }

  getAvailableCL(i) {
    if (this.showUnits)
      return this.configService.availableUnitsAmount(i);
    return this.configService.availableAmount(i);
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
      cls
    } = formValue;

    return {      
      cls
    };
  }

}
