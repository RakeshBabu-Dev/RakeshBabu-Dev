import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router, private apiService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(false),
    });
  }

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');
    if (storedEmail) {
      this.loginForm.patchValue({ email: storedEmail, rememberMe: true });
    }
  }
  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { email, password, rememberMe } = this.loginForm.value;
    this.apiService.login({ email, password }).subscribe(
      (response) => {
        const { access_token, refresh_token } = response;
        this.apiService.storeTokens(access_token, refresh_token, rememberMe, email);
        console.log(response, "RESP");
        localStorage.setItem('user_type',response.current_user.user_type)
        localStorage.setItem('credential',JSON.stringify(response.current_user))
        this.router.navigate(['dashboard']).then(
          (success) => {
            if (success) {
              console.log('Navigation to dashboard successful');
            } else {
              console.error('Navigation to dashboard failed');
            }
          },
          (err) => {
            console.error('Navigation error:', err);
          }
        );
      },
      (error) => {
        console.error('Error:', error);

        if (error?.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Login failed, please try again.';
        }
      }
    );
  }


  onRegister(): void {
    this.router.navigate(['/register']);
  }
}
