import { Target } from '@angular/compiler';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MathValidators {
  static addition(
    target: string,
    sourceA: string,
    sourceB: string
  ): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const answer = form.value[target];
      const firstNum = form.value[sourceA];
      const secondNum = form.value[sourceB];
      if (firstNum + secondNum === +answer) {
        return null;
      }
      return { answer: 'wrong' };
    };
  }

  static lessThenEighteen(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value <= 18 ? null : { valid: false };
    };
  }
}
