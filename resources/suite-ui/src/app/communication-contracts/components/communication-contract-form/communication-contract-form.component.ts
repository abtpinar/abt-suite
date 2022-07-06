import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { parseNestedEntities } from "src/app/common/services/utils";
import { CommunicationContractModel } from "../../models/communication-contract.model";
import { EmployeeModel } from '../../../employees/models/employee.model';
import { CommunicationContractsSandbox } from "../../communication-contracts.sandbox";
import { MobileModel } from "src/app/parameters/communications/models/mobile.model";
import { SimModel } from "src/app/parameters/communications/models/sim.model";
import { Router } from "@angular/router";


@Component({
  selector: 'app-contract-form',
  templateUrl: './communication-contract-form.component.html',
  styleUrls: ['./communication-contract-form.component.sass']
})
export class CommunicationContractFormComponent implements OnInit, OnChanges, OnDestroy {

  isEdit = false;
  contractForm: FormGroup = this.toFormGroup();

  subscriptions$: Subscription[] = [];

  @Input()
  contract: CommunicationContractModel;

  @Input()
  initialEmployee: EmployeeModel;

  @Input()
  availableMobiles: MobileModel[];

  @Input()
  availableSims: SimModel[];

  @Output()
  create = new EventEmitter<CommunicationContractModel>();

  @Output()
  update = new EventEmitter<CommunicationContractModel>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sandbox: CommunicationContractsSandbox
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.contract) {
      this.isEdit = !!this.contract.id;;
      this.contract = parseNestedEntities(this.contract);
      this.contractForm.patchValue(this.contract);
      if (this.contract.mobile_accesories) {
        const mobile_accesories = JSON.parse(this.contract.mobile_accesories);
        this.contractForm.patchValue(mobile_accesories);
      }      
    } else {
      // this.router.navigateByUrl(`communication-contracts`);
    }

    if (changes['initialEmployee']) {
      this.contractForm.get('employee').setValue(changes['initialEmployee'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
    this.sandbox.clearCommunicationContractEmployee();
  }

  get selectedEmployee() {
    return this.contractForm.get('employee').value;
  }

  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      employee: [null, Validators.required],
      sim_id: [null],
      call_time: [null],
      sms_credit: [null],
      data_plan: [null],
      ip_address: [null],
      mobile_id: [null],

      isNew: [false],
      charger: [false],
      cable: [false],
      headphones: [false],
      mica: [false],
      cover: [false],
      card_sd: [false],
    });
  }

  prepareEntity(formValue) {
    const {
      employee,

      isNew,
      charger,
      cable,
      headphones,
      mica,
      cover,
      card_sd,
    } = formValue;

    let entity = {
      id: this.isEdit ? this.contract.id : null,
      employee_id: employee.id,
      mobile_accesories: JSON.stringify({
        isNew,
        charger,
        cable,
        headphones,
        mica,
        cover,
        card_sd
      })
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
