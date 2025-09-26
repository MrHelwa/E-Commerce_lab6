import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    // If user is already logged in, redirect them away from login/register pages
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/products']); // Redirect to products page
      return false;
    }

    // If not logged in, allow access to login/register pages
    return true;
  }
}