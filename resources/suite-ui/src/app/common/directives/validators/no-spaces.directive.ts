import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { SuiteValidators } from '../../services/suite-validators';

@Directive({
  selector: '[appNoSpacesValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NoSpacesDirective, multi: true }
  ]
})
export class NoSpacesDirective implements Validator {
  constructor() {}

  registerOnValidatorChange(fn: () => void): void {}

  validate(control: AbstractControl): ValidationErrors | null {
    return SuiteValidators.noSpaces(control);
  }
}
