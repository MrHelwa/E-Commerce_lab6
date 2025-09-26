import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, LoginRequest } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLogin {
  loginForm: FormGroup;
  loginMessage: string = '';
  isLoading: boolean = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Changed from email to username for FakeStore API
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Get form control
  getControl(controlName: string) {
    return this.loginForm.get(controlName);
  }

  // Check if field is invalid and touched
  isFieldInvalid(controlName: string): boolean {
    const control = this.getControl(controlName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  // Check if field is valid and touched
  isFieldValid(controlName: string): boolean {
    const control = this.getControl(controlName);
    return !!(control?.valid && (control?.dirty || control?.touched));
  }

  // Reset form
  resetForm() {
    this.loginForm.reset();
    this.loginMessage = '';
    this.loginError = '';
  }

  // Submit form with API call
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      const credentials: LoginRequest = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.apiService.login(credentials).subscribe({
        next: (response) => {
          // Save token to localStorage
          this.authService.saveToken(response.token);

          this.loginMessage = 'Login successful! Redirecting...';
          this.isLoading = false;

          // Redirect to products page after successful login
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1500);
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError = 'Invalid username or password. Please try again.';
          console.error('Login error:', error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }
}