import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from '../matchpassword.validator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
Router;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  isLoading: boolean = false;
  apiError: string = '';
  registrationForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        ),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    {
      validators: matchpassword,
    }
  );
  handlRegister(registrationForm: FormGroup) {
    this.isLoading = true;
    if (registrationForm.valid) {
      this._AuthService.register(registrationForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.isLoading = false;
            this._Router.navigate(['/signin']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.errors.msg;
          console.log(err);
        },
      });
    }
  }
}
