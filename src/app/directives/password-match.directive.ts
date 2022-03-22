import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidationService } from '../services/custom-validation.service';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    { provide: NG_VALIDATORS, 
      useExisting: PasswordMatchDirective, 
      multi: true}
  ]
})
export class PasswordMatchDirective implements Validator{

  @Input('appMatchPassword') MatchPassword: string[] = [];

  constructor(private customValidator: CustomValidationService) { }

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.customValidator.matchPassword(this.MatchPassword[0], this.MatchPassword[1])(formGroup);
  }

}
