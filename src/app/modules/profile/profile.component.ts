import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  changePasswordForm: FormGroup;
  currentUser: any;
  btnloading: boolean = false;
  hide: boolean = true;
  hide2: boolean = true;
  hide3: boolean = true;
  loading: boolean = false;
  username = new FormControl('', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]);
  constructor(private news: NewsService,  private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private customValidator: CustomValidationService,
    private activatedRoute: ActivatedRoute) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['',  [Validators.required, Validators.maxLength(20),Validators.minLength(10), Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.customValidator.comparePassword("oldPassword", "password"), this.customValidator.MatchPassword("password", "confirmPassword") ] });
     }

  ngOnInit(): void {
    this.getCurrentUser()
    
  }
  getCurrentUser() {
    this.loading = true;
    this.currentUser = this.news.currentuser;
    if (this.currentUser) {
       this.username.setValue(this.currentUser.username);
    }
    this.loading = false;
  }
  changePassword() {
    this.btnloading = true;
      console.log("password", this.changePasswordForm.value.password,)
      console.log("old", this.changePasswordForm.value.oldPassword)
      if (this.changePasswordForm.valid) {
        if (this.currentUser.password == this.changePasswordForm.value.oldPassword) {
          this.currentUser.password = this.changePasswordForm.value.password;
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.snackBar.open('password Updated sucessfuly', '', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['g-green-bg']
          });
          this.btnloading = false;
          this.updateUser();
          window.location.reload();
          this.changePasswordForm.reset();
          this.changePasswordForm.markAsPristine();
          this.changePasswordForm.markAsUntouched();
          this.changePasswordForm.updateValueAndValidity();
          this.changePasswordForm.controls.confirmPassword.setErrors(null);
          this.changePasswordForm.controls.password.setErrors(null);
        } else {
          this.btnloading = false;
           this.snackBar.open('Old Password is wrong', '', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['g-red1-bg']
            });
        }
    }
  }
  changeUsername() {
    if (this.username.valid) {
      console.log("username", this.username.value)
       this.currentUser.username = this.username.value;
       localStorage.removeItem('currentUser');
       localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
       this.snackBar.open('User Name Updated', '', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['g-green-bg']
       });
      this.updateUser();
      window.location.reload();
    }
  }

  updateUser(){
    let existingEntries = JSON.parse(localStorage.getItem('registeredUsers')!);
    existingEntries.splice(existingEntries.findIndex((a:any) => a.email === this.currentUser.email) , 1)
    console.log("Existing User", existingEntries);
    existingEntries.push(this.currentUser);
    localStorage.removeItem('registeredUsers');
    localStorage.setItem('registeredUsers', JSON.stringify(existingEntries));
  }
}
