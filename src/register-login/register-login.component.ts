import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-login',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],

})
export class RegisterLoginComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  phoneNumber: string = '';
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;
  isUsernameValid: boolean = true;

  constructor(private router: Router) {}

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailValid = emailRegex.test(this.email);
  }
  validateUsername(): void {
    this.isUsernameValid = this.username.length >= 3;  // Ensure username has at least 3 characters
  }
  validatePassword(): void {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    this.isPasswordValid = passwordRegex.test(this.password);
  }

  onRegister(): void {
    this.validateEmail();
    this.validatePassword();

    if (!this.isEmailValid || !this.isPasswordValid) {
      alert('Please fix the errors in the form.');
      return;
    }

    console.log('Registered successfully with email:', this.email);
    alert('Registration successful!');
    this.router.navigate(['/login']);
  }

  // Login logic
  onLogin(): void {
    this.validateEmail();

    if (!this.isEmailValid || !this.password) {
      alert('Please enter valid credentials.');
      return;
    }

    console.log('Logged in successfully with email:', this.email);
    alert('Login successful!');
    this.router.navigate(['/dashboard']);
  }
}
