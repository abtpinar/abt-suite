import {AbstractControl, ValidationErrors} from '@angular/forms';

export class SuiteValidators {
  private static isNotEmpty(value): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  public static email(formControl: AbstractControl): ValidationErrors | null {
    if (SuiteValidators.isNotEmpty(formControl.value)) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formControl.value
      )
        ? null
        : { email: { valid: false } };
    }
    return null;
  }

  public static digits(formControl: AbstractControl): ValidationErrors | null {
    if (SuiteValidators.isNotEmpty(formControl.value)) {
      return /^\d+$/.test(formControl.value)
        ? null
        : { digits: { valid: false } };
    }
    return null;
  }

  public static digitsLimit(limit: number, maxDecimalPlaces = null) {
    return (formControl: AbstractControl): ValidationErrors | null => {
      const { value } = formControl;
      if (SuiteValidators.isNotEmpty(value)) {
        if (isNaN(value)) {
          return { maxDigits: { valid: false } };
        }

        if (Math.floor(value) === +value) {
          return value.toString().length <= limit
            ? null
            : { maxDigits: { valid: false } };
        } else {
          let digits;

          if (value.toString().length === 1) {
            // Validate scientific notation that javascript
            // uses when number is too large
            const last = value
              .toString()
              .split()
              .slice(-1);
            digits = Number.parseFloat(value)
              .toFixed(last)
              .toString()
              .split('.');
          } else {
            digits = value.toString().split('.');
          }

          if (maxDecimalPlaces && digits[1].length > maxDecimalPlaces)
            return { maxDigits: { valid: false } };

          return digits[0].length + digits[1].length <= limit
            ? null
            : { maxDigits: { valid: false } };
        }
      }
      return null;
    };
  }

  public static minDate(minDate: Date, formatter?: (date: string) => Date) {
    return (formControl: AbstractControl): ValidationErrors | null => {
      if (SuiteValidators.isNotEmpty(formControl.value)) {
        let compareValue: Date = null;
        if (formatter) {
          compareValue = formatter(formControl.value);
        } else {
          compareValue = formControl.value;
        }

        if (minDate > compareValue) {
          return { minDate: { valid: false } };
        } else {
          return null;
        }
      }
      return null;
    };
  }

  public static minDateValidator(result){
    return (formControl: AbstractControl): ValidationErrors | null => {
      
      if(result){
        return { currentDate: { valid: false } };
      }else
      return null;
    }
    
  }

  public static noSpaces(
    formControl: AbstractControl
  ): ValidationErrors | null {
    if (SuiteValidators.isNotEmpty(formControl.value)) {
      if (formControl.value.includes(' ')) {
        return { noSpaces: { valid: false } };
      } else {
        return null;
      }
    }
    return null;
  }

  public static number(formControl: AbstractControl): ValidationErrors | null {
    if (SuiteValidators.isNotEmpty(formControl.value)) {
      return /^-?\d+(\.,?\d+)?$/.test(formControl.value)
        ? null
        : { digits: { valid: false } };
    }
    return null;
  }

  public static phoneNumber(formControl: AbstractControl): ValidationErrors | null {
    if (SuiteValidators.isNotEmpty(formControl.value)) {
      return /^[^9][\d]+$/.test(formControl.value)
        ? null
        : { digits: { valid: false } };
    }
    return null;
  }
}
