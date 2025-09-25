import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div style="padding: 20px;">
      <h1>About Us</h1>
      <p>We are a leading e-commerce platform established in 2020.</p>
      <div style="margin: 20px 0;">
        <h3>Our Mission</h3>
        <p>To provide high-quality products at competitive prices with excellent customer service.</p>
        
        <h3>Our Vision</h3>
        <p>To become the most trusted online marketplace in the region.</p>
        
        <h3>Our Values</h3>
        <ul>
          <li>Quality Products</li>
          <li>Customer Satisfaction</li>
          <li>Fast Delivery</li>
          <li>Competitive Pricing</li>
        </ul>
      </div>
    </div>
  `
})
export class About { }