import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this._Router.navigate(['/home']);
    }
  }
  isLoading: boolean = false;
  apiError: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  handlLogin(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            localStorage.setItem('userToken', response.token);
            this._AuthService.decodeUserData();
            this.isLoading = false;
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = 'Please check your email or password!!';
        },
      });
    }
  }
}
