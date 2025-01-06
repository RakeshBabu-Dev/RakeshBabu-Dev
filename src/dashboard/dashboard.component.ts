import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from './dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isDropdownVisible = false;
  dashboardData: any;
  isAuthenticated: boolean = false;

  // Form group for reset password
  resetPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  doPasswordsMatch: boolean = true;
  user:any;
  currentUserId:string = '';
  constructor(
    private router: Router,
    private dashboardService: DashBoardService,
    private fb: FormBuilder
  ) {
    // Initialize the reset password form
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    this.user = localStorage.getItem('user_type');
    const cred = localStorage.getItem('credential')!;
    const par = JSON.parse(cred)
    this.currentUserId = par.id

    this.isAuthenticated = !!token; // Check if token exists
    this.getDashboardDetails();
  }

  getDashboardDetails(): void {
    if (this.isAuthenticated) {
      this.dashboardService.dashboardDetails().subscribe(
        (data) => {
          this.dashboardData = data.message;
        },
        (error) => {
          console.error('Error fetching dashboard data:', error);
        }
      );
    } else {
      console.log('Public user, no API call for private data.');
    }
  }

  onStatusChange(item: any): void {
    const payload = {
      id: item.id,
      status: item.status == 1 ? 0 : 1,
    };
    this.dashboardService.userStatusChange(payload).subscribe(
      (data) => {
        console.log('Dashboard Data:', this.dashboardData);
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    );
  }

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Logout functionality
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  // Reset password functionality
  onResetPassword(): void {
    const { currentPassword, newPassword, confirmPassword } = this.resetPasswordForm.value;

    if (newPassword != confirmPassword) {
      this.doPasswordsMatch = false;
      this.errorMessage = 'Passwords do not match.';
      this.successMessage = '';
      return;
    }

    const payload = {
      currentPassword,
      newPassword,
      'id':this.currentUserId
    };
    console.log(payload,"PAYLOAD");

    this.dashboardService.resetPassword(payload).subscribe(
      (response) => {
        this.successMessage = 'Password reset successfully!';
        this.errorMessage = '';
        this.resetPasswordForm.reset();
      },
      (error) => {
        this.errorMessage = 'Error resetting password. Please try again.';
        this.successMessage = '';
        console.error('Reset Password Error:', error);
      }
    );
  }
}
