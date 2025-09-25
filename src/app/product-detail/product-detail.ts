import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../models/iproducts';
import { ProductsService } from '../services/products';
import { Input, Output, EventEmitter } from '@angular/core';
import { Products } from '../products/products';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  @Input() product: IProduct | undefined;
  @Output() closeDetails = new EventEmitter<void>();
  productId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    // If product input is not provided, get from route
    if (!this.product) {
      this.route.params.subscribe(params => {
        this.productId = +params['id'];
        this.product = this.productsService.getProductByID(this.productId);

        if (!this.product) {
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

  goBack(): void {
    // If used as a dialog, emit close event
    this.closeDetails.emit();
    // If used as a route, navigate
    this.router.navigate(['/products']);
  }
}