import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div style="padding: 20px;">
      <h1>Contact Us</h1>
      <div style="margin: 20px 0;">
        <h3>Get in Touch</h3>
        <p><strong>Email:</strong> info@ourstore.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Shopping Street, City, State 12345</p>
        
        <h3>Business Hours</h3>
        <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
        <p>Saturday: 10:00 AM - 6:00 PM</p>
        <p>Sunday: 12:00 PM - 5:00 PM</p>
        
        <h3>Customer Support</h3>
        <p>For any questions or concerns, please don't hesitate to reach out!</p>
      </div>
    </div>
  `
})
export class Contact { }