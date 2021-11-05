import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerUser: FormGroup;
  loading: boolean = false;
  btnloading: boolean = false;
  hide: boolean = true;
  hide2: boolean = true;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private customValidator: CustomValidationService, private router: Router) {
     this.registerUser = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")] ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20),Validators.minLength(10), Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
      confirmPassword: ['', Validators.required],
    }, { validator: [this.customValidator.MatchPassword("password", "confirmPassword"), this.customValidator.emailAvailabilityValidator('email')] });
  }

  ngOnInit() {}


  get registerUserControl() {
		return this.registerUser.controls;
  }
  
 submit() {
   if (this.registerUser.valid) {
     this.btnloading = true;
     let existingEntries: any = JSON.parse(localStorage.getItem('registeredUsers')!);
     if (existingEntries == null) { existingEntries = [] };
     existingEntries.push(this.registerUser.value);
     localStorage.setItem('registeredUsers', JSON.stringify(existingEntries));
     this.snackBar.open('Signup Successful', '', {
       duration: 2000,
       verticalPosition: 'top',
       horizontalPosition: 'right',
       panelClass: ['g-green-bg']
     });
     this.btnloading = false;
     this.registerUser.markAsPristine();
     this.registerUser.markAsUntouched();
     this.registerUser.reset();
     this.registerUser.controls.username.setErrors(null);
     this.registerUser.controls.email.setErrors(null);
     this.registerUser.controls.password.setErrors(null);
     this.registerUser.controls.confirmPassword.setErrors(null);
     this.registerUser.updateValueAndValidity();
     this.router.navigateByUrl(`login`);
   } else {
     this.btnloading = false;
      this.snackBar.open('Something went wrong', '', {
       duration: 2000,
       verticalPosition: 'top',
       horizontalPosition: 'right',
       panelClass: ['g-red1-bg']
     });
   }
  }
}
