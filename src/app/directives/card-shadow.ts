import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appCardShadow]'
})
export class CardShadow {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    // Set initial styles
    this.el.nativeElement.style.borderRadius = '10px';
    this.el.nativeElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    this.el.nativeElement.style.border = '1px solid #ddd';
    this.el.nativeElement.style.transition = 'all 0.3s ease';
  }

  @HostListener('mouseenter') onMouseEnter() {
    // On hover - increase border and shadow
    this.el.nativeElement.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
    this.el.nativeElement.style.border = '2px solid #007bff';
    this.el.nativeElement.style.transform = 'translateY(-5px)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    // On mouse out - back to original
    this.el.nativeElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    this.el.nativeElement.style.border = '1px solid #ddd';
    this.el.nativeElement.style.transform = 'translateY(0)';
  }

}
