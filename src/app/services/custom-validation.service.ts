import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }
      //1 upper case letter at least
      //1 lower case letter at least
      //1 number at least
      //min symbols = 8
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    }
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true })
        return confirmPasswordControl.errors;
      } else {
        confirmPasswordControl.setErrors(null);
        return confirmPasswordControl.errors;
      }
    }
  }
}
