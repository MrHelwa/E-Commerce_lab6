import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Clock } from './components/clock/clock';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, Clock],
  template: `
    <div>
      <!-- Navigation Bar -->
      <nav style="background-color: #343a40; padding: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2 style="color: white; margin: 0;">Product Store</h2>
          
          <div style="display: flex; gap: 15px;">
            <a routerLink="/home" 
               routerLinkActive="active" 
               style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px;">
               Home
            </a>
            <a routerLink="/products" 
               routerLinkActive="active"
               style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px;">
               Products
            </a>
            <a routerLink="/search-products" 
               routerLinkActive="active"
               style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px;">
               Search
            </a>
            
            <!-- Show Login/Register if not logged in -->
            @if (!isLoggedIn) {
              <a routerLink="/register" 
                 routerLinkActive="active"
                 style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px;">
                 Register
              </a>
              <a routerLink="/login" 
                 routerLinkActive="active"
                 style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px;">
                 Login
              </a>
            }
            
            <!-- Show Logout if logged in -->
            @if (isLoggedIn) {
              <button 
                (click)="logout()"
                style="background-color: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">
                Logout
              </button>
            }
            
            <a routerLink="/about" 
               routerLinkActive="active"
               style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px;">
               About
            </a>
            <a routerLink="/contact" 
               routerLinkActive="active"
               style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px;">
               Contact
            </a>
          </div>
          
          <!-- Clock Toggle -->
          <button 
            (click)="toggleClock()"
            style="background-color: #007bff; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">
            {{ showClock ? 'Hide Clock' : 'Show Clock' }}
          </button>
        </div>
      </nav>

      <!-- Clock Component -->
      @if (showClock) {
        <app-clock></app-clock>
      }

      <!-- Router Outlet for displaying components -->
      <router-outlet></router-outlet>
    </div>
    
    <style>
      .active {
        background-color: #007bff !important;
        font-weight: bold;
      }
    </style>
  `,
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy {
  title = 'lab6';
  showClock = false;
  isLoggedIn = false;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Subscribe to authentication status changes
    this.authSubscription = this.authService.isLoggedIn$().subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  toggleClock(): void {
    this.showClock = !this.showClock;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']); // Redirect to home after logout
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}