import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../models/iproducts';
import { ICategory } from '../models/icategory';
import { CardShadow } from '../directives/card-shadow';
import { CreditCardPipe } from '../pipes/credit-card-pipe';
import { ProductDetail } from '../product-detail/product-detail';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../services/products';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CardShadow, CreditCardPipe, RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
  productList: IProduct[] = [];
  categories: ICategory[] = [];
  searchText: string = '';
  selectedCategoryId: number = 0;

  // NEW for Lab 3
  selectedProduct: IProduct | null = null;
  showDetails: boolean = false;
  currentDate: Date = new Date();
  creditCardNumber: string = '1234567890123456';

  constructor(private productsService: ProductsService) {
    this.productList = this.productsService.getAllProducts();
    this.categories = this.productsService.getAllCategories();
  }

  //Lab 2 methods
  getStockStatus(quantity: number): string {
    switch (quantity) {
      case 0:
        return 'out of stock';
      case 1:
        return 'last one item';
      case 2:
        return 'last two items';
      default:
        return 'in stock';
    }
  }

  getStockClass(quantity: number): string {
    switch (quantity) {
      case 0:
        return 'red';
      case 1:
      case 2:
        return 'orange';
      default:
        return 'green';
    }
  }

  buyProduct(product: IProduct): void {
    if (product.quantity > 0) {
      //product.quantity = Math.max(0, product.quantity - 2);
      this.productsService.updateProductQuantity(product.id, Math.max(0, product.quantity - 2));
    }
  }

  // showDetails(product: IProduct): void {
  //   const categoryName = this.categories.find(c => c.id === product.categoryId)?.name || 'Unknown';
  //   alert(`Product Details:
  //   Name: ${product.name}
  //   Price: ${product.price}
  //   Quantity: ${product.quantity}
  //   Category: ${categoryName}
  //   ID: ${product.id}`);
  // }

  get filteredProducts(): IProduct[] {
    let filtered = this.productList;

    if (this.searchText) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.selectedCategoryId > 0) {
      filtered = filtered.filter(product =>
        product.categoryId === this.selectedCategoryId
      );
    }

    return filtered;
  }

  // NEW Lab 3 methods
  viewDetails(product: IProduct): void {
    this.selectedProduct = product;
    this.showDetails = true;
  }

  onCloseDetails(): void {
    this.showDetails = false;
    this.selectedProduct = null;
  }
}