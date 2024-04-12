import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchpassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let password = control.get('password');
  let rePassword = control.get('rePassword');
  if (password && rePassword && password?.value != rePassword?.value) {
    return {
      passwordmatcherror: true,
    };
  }
  return null;
};
