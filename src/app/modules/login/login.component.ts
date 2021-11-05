import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  btnloading: boolean = false;
  hide: boolean = true;

   constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get loginFormControl() {
    return this.loginForm.controls;
  }

  async loginUser() {
    if (this.loginForm.valid) {
      this.btnloading = true;
        let allusers = JSON.parse(localStorage.getItem('registeredUsers')!);
        if (allusers) {
          console.log("email", this.loginForm.value.email);
          console.log("password", this.loginForm.value.password);
          let validUser = allusers.find((user: any) => {
            return ((this.loginForm.value.email == user.email) && (this.loginForm.value.password == user.password));
          })
          console.log('validUser', validUser);
          if (validUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(validUser));
            this.snackBar.open('Login successfull', '', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['g-green-bg'],
            });
            this.btnloading = false;
            this.loginForm.reset();
            this.loginForm.markAsPristine();
            this.loginForm.markAsUntouched();
            this.loginForm.updateValueAndValidity();
            this.loginForm.controls.email.setErrors(null);
            this.loginForm.controls.password.setErrors(null);
            this.router.navigateByUrl(`home`);
          } else {
            this.btnloading = false;
            this.snackBar.open('Something went wrong', '', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['g-red1-bg'],
            });
          }
        }
    }
  }

}
