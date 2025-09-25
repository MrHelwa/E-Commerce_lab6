import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Clock } from './components/clock/clock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Clock],
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
export class App {
  title = 'lab5';
  showClock = false;

  toggleClock(): void {
    this.showClock = !this.showClock;
  }
}