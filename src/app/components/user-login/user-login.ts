import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLogin {
  loginForm: FormGroup;
  loginData: any = null;
  loginMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    this.loginData = null;
    this.loginMessage = '';
  }

  // Submit form
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginData = this.loginForm.value;
      this.loginMessage = 'Login successful! Welcome back!';

      // Simulate login process
      setTimeout(() => {
        this.resetForm();
      }, 3000); // Clear after 3 seconds
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }
}