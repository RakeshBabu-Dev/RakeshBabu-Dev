import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  constructor(private router: Router, private apiService: AuthService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{6,}$/
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  get doPasswordsMatch(): boolean {
    return (
      this.registerForm.get('password')?.value ===
      this.registerForm.get('confirmPassword')?.value
    );
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all the fields correctly.';
      return;
    }

    if (!this.doPasswordsMatch) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const user = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.apiService.register(user).subscribe(
      (response) => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        this.errorMessage = 'User already exists or there was an error.';
        this.successMessage = '';
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/login']);
  }
}
