import { FormControl, FormGroup} from '@angular/forms';

export class BasicValidators {

  static email (control: FormControl) {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEXP.test(control.value) ? null : {
      validateEmail: true
    };
  }

  static password (control: FormControl){
    let PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{5,})$/;
    return PASSWORD_REGEXP.test(control.value) ? null : {
      validatePassword: true
    };
  }

  static matchPassword(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      return (passwordInput.value === passwordConfirmationInput.value) ? passwordConfirmationInput.setErrors(null) :
        passwordConfirmationInput.setErrors({notEquivalent: true});
    };
  }
}
