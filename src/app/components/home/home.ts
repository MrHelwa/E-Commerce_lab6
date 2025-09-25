import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="padding: 20px;">
      <h1>Welcome to Our Store!</h1>
      <p>Your one-stop shop for electronics, clothing, books, and sports equipment.</p>
      <div style="margin: 20px 0;">
        <h3>Featured Categories:</h3>
        <ul>
          <li>Electronics - Latest gadgets and devices</li>
          <li>Clothing - Fashion for everyone</li>
          <li>Books - Knowledge at your fingertips</li>
          <li>Sports - Stay active and healthy</li>
        </ul>
      </div>
      <p>Browse our products and find exactly what you need!</p>
    </div>
  `
})
export class Home { }