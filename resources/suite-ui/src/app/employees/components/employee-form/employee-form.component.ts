import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { parseNestedEntities } from "src/app/common/services/utils";
import { EmployeeModel } from "../../models/employee.model";


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.sass']
})
export class EmployeeFormComponent implements OnInit, OnChanges, OnDestroy {

  isEdit = false;
  employeeForm: FormGroup = this.toFormGroup();

  subscriptions$: Subscription[] = [];

  @Input()
  employee: EmployeeModel;

  // @Input()
  // availableCups: ICups[];

  @Output()
  create = new EventEmitter<EmployeeModel>();

  @Output()
  update = new EventEmitter<EmployeeModel>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.employee) {
      this.isEdit = true;
      this.employee = parseNestedEntities(this.employee);
      this.employeeForm.patchValue(this.employee);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
  }

  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      dni: [null, Validators.required],
      first_name: [null, Validators.required],
      middle_name: [null, Validators.required],
      last_name: [null, Validators.required],
      department: [null, Validators.required],
      occupation: [null, Validators.required]
    });
  }

  prepareEntity(formValue) {
    const {
      dni,
      first_name,
      middle_name,
      last_name,
      department,
      occupation
    } = formValue;

    let entity = {
      id: this.isEdit ? this.employee.id : null,
      dni,
      first_name,
      middle_name,
      last_name,
      department,
      occupation
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
