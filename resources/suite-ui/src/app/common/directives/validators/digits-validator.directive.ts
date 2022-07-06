import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import { SuiteValidators } from '../../services/suite-validators';

@Directive({
  selector: '[appDigitsValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DigitsValidatorDirective, multi: true}]
})
export class DigitsValidatorDirective implements Validator {

  constructor() { }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return SuiteValidators.digits(control);
  }

}
