import { Injectable } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  	MatchPassword(password: string, confirmPassword: string) {
		return ((formGroup: FormGroup) => {
			const passwordControl = formGroup.controls[password];
			const confirmPasswordControl = formGroup.controls[confirmPassword];

			if (!passwordControl || !confirmPasswordControl) {
				return null;
			}

			if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
				return null;
			}

			if (confirmPasswordControl.value !== passwordControl.value) {
				confirmPasswordControl.setErrors({ passwordMismatch: true });
			} else {
				confirmPasswordControl.setErrors(null);
			}
		});
    }
  
  	emailAvailabilityValidator(email: string) {
      return (formGroup: FormGroup) => {
        const emailControl = formGroup.controls[email];
        let allusers = JSON.parse(localStorage.getItem('registeredUsers')!);
        // console.log("allusers", allusers);
        if (allusers) {
          let isExist = allusers.some((user: any) => {
            return user.email === emailControl.value
          })
          if (isExist) {
              emailControl.setErrors({emailAlreadyExist: true})
            } else {
              emailControl.setErrors(null)
            }
        }
      }
	}
  
	comparePassword(old_password: string, password: string) {
		return (formGroup: FormGroup) => {
			const oldPasswordControl = formGroup.controls[old_password];
			const passwordControl = formGroup.controls[password];

			if (!oldPasswordControl || !passwordControl) {
				return null;
			}

			if (oldPasswordControl.value == passwordControl.value) {
				passwordControl.setErrors({ passwordSame: true });
			} else {
				passwordControl.setErrors(null);
			}
		};
	}
}
