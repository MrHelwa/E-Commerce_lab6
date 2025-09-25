import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="text-align: center; padding: 50px;">
      <h1 style="font-size: 72px; color: #dc3545;">404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <a routerLink="/home" style="color: #007bff; text-decoration: none; font-weight: bold;">
        Go Back Home
      </a>
    </div>
  `
})
export class NotFound { }