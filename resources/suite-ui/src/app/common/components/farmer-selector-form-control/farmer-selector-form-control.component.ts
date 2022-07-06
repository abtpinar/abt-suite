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
import { FarmerSelectionModalComponent } from '../farmer-selection-modal/farmer-selection-modal.component';
import { take } from 'rxjs/operators';
import { FarmerModel } from 'src/app/farmers/models/farmer.model';
import {FarmersSandbox} from '../../../farmers/farmers.sandbox';

const FARMER_SELECTOR_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FarmerSelectorFormControlComponent),
  multi: true
};

@Component({
  selector: 'app-farmer-selector-form-control',
  templateUrl: './farmer-selector-form-control.component.html',
  styleUrls: ['./farmer-selector-form-control.component.sass'],
  providers: [FARMER_SELECTOR_CONTROL_ACCESSOR]
})
export class FarmerSelectorFormControlComponent
  implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() disable: boolean = false;
  @Input() value: FarmerModel = null;
  @Input() useCustomTemplate: boolean = false;

  @Input() sector: string;

  @Output() selectFarmer = new EventEmitter<FarmerModel>();

  visibleModal: boolean;

  private onTouch: Function;
  private onModelChange: (value: FarmerModel) => void = () => {};

  constructor(private sandbox: CommonSandbox, private farmersSandbox: FarmersSandbox) {}

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

  farmerSelected(newValue: FarmerModel) {
    this.value = newValue;
    this.onTouch;
    this.onModelChange(this.value);
    this.selectFarmer.emit(this.value);
    this.visibleModal = false;
  }

  showSelectionModal() {
    // console.log('sector::.', this.sector);
    // const modalRef = this.sandbox.showModal(
    //   FarmerSelectionModalComponent,
    //   { initialState: { sector: this.sector } },
    //   {
    //     class: 'modal-xl'
    //   }
    // );
    //
    // const modalComponentRef = modalRef.content as FarmerSelectionModalComponent;
    // modalComponentRef.selectFarmer
    //   .pipe(take(1))
    //   .subscribe(selected => this.farmerSelected(selected));
    this.visibleModal = true;
  }

  get farmerFullName() {
    if (this.value) {
      const { first_name, middle_name, last_name } = this.value;
      return `${first_name} ${middle_name} ${last_name}`;
    }
    return ''
  }
}
