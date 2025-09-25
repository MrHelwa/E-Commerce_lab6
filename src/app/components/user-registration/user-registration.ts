import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-registration.html',
  styleUrls: ['./user-registration.css']
})
export class UserRegistration {
  registrationForm: FormGroup;
  registeredUser: any = null;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, this.emailPatternValidator]],
      mobiles: this.fb.array([
        this.createMobileControl()
      ]),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom email pattern validator
  emailPatternValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailPattern.test(control.value)) {
      return { emailPattern: true };
    }
    return null;
  }

  // Custom password match validator
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Create mobile form control
  createMobileControl() {
    return this.fb.control('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ]);
  }

  // Get mobiles form array
  get mobiles() {
    return this.registrationForm.get('mobiles') as FormArray;
  }

  // Add another mobile number
  addMobile() {
    this.mobiles.push(this.createMobileControl());
  }

  // Remove mobile number (only additional ones)
  removeMobile(index: number) {
    if (this.mobiles.length > 1) {
      this.mobiles.removeAt(index);
    }
  }

  // Get form control
  getControl(controlName: string) {
    return this.registrationForm.get(controlName);
  }

  // Get mobile control at index
  getMobileControl(index: number) {
    return this.mobiles.at(index);
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

  // Check if mobile field is invalid
  isMobileInvalid(index: number): boolean {
    const control = this.getMobileControl(index);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  // Check if mobile field is valid
  isMobileValid(index: number): boolean {
    const control = this.getMobileControl(index);
    return !!(control?.valid && (control?.dirty || control?.touched));
  }

  // Reset form
  resetForm() {
    this.registrationForm.reset();
    // Reset mobiles array to have only one field
    while (this.mobiles.length > 1) {
      this.mobiles.removeAt(1);
    }
    this.registeredUser = null;
  }

  // Submit form
  onSubmit() {
    if (this.registrationForm.valid) {
      this.registeredUser = this.registrationForm.value;
      this.resetForm();
    } else {
      // Mark all fields as touched to show validation errors
      this.registrationForm.markAllAsTouched();
    }
  }
}