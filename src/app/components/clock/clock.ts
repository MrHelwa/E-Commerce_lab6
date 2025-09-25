import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  template: `
    <div style="padding: 20px; border: 2px solid #007bff; border-radius: 10px; text-align: center; margin: 10px;">
      <h3>Current Time</h3>
      <h2 style="color: #007bff; font-family: monospace;">{{ currentTime }}</h2>
    </div>
  `
})
export class Clock implements OnInit, OnDestroy {
  currentTime: string = '';
  private timeInterval: any;

  ngOnInit(): void {
    console.log('Clock started');
    this.updateTime();
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    console.log('Clock stopped');
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateTime(): void {
    this.currentTime = new Date().toLocaleString();
  }
}