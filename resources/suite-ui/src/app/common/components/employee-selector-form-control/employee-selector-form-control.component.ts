import {
  Component,
  OnInit,
  forwardRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonSandbox } from '../../common.sandbox';
import { EmployeeSelectionModalComponent } from '../employee-selection-modal/employee-selection-modal.component';
import { take } from 'rxjs/operators';
import { EmployeeModel } from 'src/app/employees/models/employee.model';
import {EmployeesSandbox} from '../../../employees/employees.sandbox';

const FARMER_SELECTOR_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmployeeSelectorFormControlComponent),
  multi: true
};

@Component({
  selector: 'app-employee-selector-form-control',
  templateUrl: './employee-selector-form-control.component.html',
  styleUrls: ['./employee-selector-form-control.component.sass'],
  providers: [FARMER_SELECTOR_CONTROL_ACCESSOR]
})
export class EmployeeSelectorFormControlComponent
  implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() disable: boolean = false;
  @Input() value: EmployeeModel = null;
  @Input() useCustomTemplate: boolean = false;

  @Input() sector: string;

  @Output() selectEmployee = new EventEmitter<EmployeeModel>();

  visibleModal: boolean;

  private onTouch: Function;
  private onModelChange: (value: EmployeeModel) => void = () => {};

  constructor(private sandbox: CommonSandbox, private employeesSandbox: EmployeesSandbox) {}

  ngOnInit() {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  employeeSelected(newValue: EmployeeModel) {
    this.value = newValue;
    this.onTouch;
    this.onModelChange(this.value);
    this.selectEmployee.emit(this.value);
    this.visibleModal = false;
  }

  showSelectionModal() {
    // console.log('sector::.', this.sector);
    // const modalRef = this.sandbox.showModal(
    //   EmployeeSelectionModalComponent,
    //   { initialState: { sector: this.sector } },
    //   {
    //     class: 'modal-xl'
    //   }
    // );
    //
    // const modalComponentRef = modalRef.content as EmployeeSelectionModalComponent;
    // modalComponentRef.selectEmployee
    //   .pipe(take(1))
    //   .subscribe(selected => this.employeeSelected(selected));
    this.visibleModal = true;
  }

  get employeeFullName() {
    if (this.value) {
      const { first_name, middle_name, last_name } = this.value;
      return `${first_name} ${middle_name} ${last_name}`;
    }
    return ''
  }
}
