import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidators {

  static shouldBeOldPassword(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value !== '1234') {
          resolve({ shouldBeOldPassword: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }

  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl | any) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl && checkControl.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control && checkControl && control.value !== checkControl.value) {
        controls.get(checkControlName).setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
