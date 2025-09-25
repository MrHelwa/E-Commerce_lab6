import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproducts';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'  // This means the service is available application-wide as a singleton
})
export class ProductsService {
  private products: IProduct[] = [
    {
      id: 1,
      name: 'iPhone 15',
      quantity: 5,
      price: 999,
      img: 'https://tse4.mm.bing.net/th/id/OIP.CfoYfKJ5P_z_yJt1zei1pQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      categoryId: 1
    },
    {
      id: 2,
      name: 'Samsung TV',
      quantity: 2,
      price: 1200,
      img: 'https://th.bing.com/th?id=OIF.%2f7nfTD%2fx6Nf%2bJT34ALEhMA&rs=1&pid=ImgDetMain&o=7&rm=3',
      categoryId: 1
    },
    {
      id: 3,
      name: 'Nike Shoes',
      quantity: 0,
      price: 150,
      img: 'https://th.bing.com/th/id/OIP.uq8HlbgQX2iOzE_85eewowHaJx?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
      categoryId: 4
    },
    {
      id: 4,
      name: 'T-Shirt',
      quantity: 10,
      price: 25,
      img: 'https://tse2.mm.bing.net/th/id/OIP.yWrdvw-PpAjbtVkvPfK1VQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      categoryId: 2
    },
    {
      id: 5,
      name: 'JavaScript Book',
      quantity: 1,
      price: 45,
      img: 'https://m.media-amazon.com/images/I/71oZ45OrLjL._AC_UL480_FMwebp_QL65_.jpg',
      categoryId: 3
    },
    {
      id: 6,
      name: 'Laptop',
      quantity: 3,
      price: 800,
      img: 'https://tse1.mm.bing.net/th/id/OIP.6uFgrLKYm31ra-pY3p8H4gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      categoryId: 1
    }, {
      id: 7,
      name: 'Laptop',
      quantity: 3,
      price: 800,
      img: 'https://tse1.mm.bing.net/th/id/OIP.6uFgrLKYm31ra-pY3p8H4gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      categoryId: 1
    }
  ];

  private categories: ICategory[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' },
    { id: 4, name: 'Sports' }
  ];

  constructor() { }

  // Get all products
  getAllProducts(): IProduct[] {
    return this.products;
  }

  // Get products by category ID
  getProductsByCatID(catID: number): IProduct[] {
    return this.products.filter(product => product.categoryId === catID);
  }

  // Get product by ID
  getProductByID(prodID: number): IProduct | undefined {
    return this.products.find(product => product.id === prodID);
  }

  // Get all categories
  getAllCategories(): ICategory[] {
    return this.categories;
  }

  // Update product quantity (for buy function)
  updateProductQuantity(productId: number, newQuantity: number): void {
    const product = this.getProductByID(productId);
    if (product) {
      product.quantity = newQuantity;
    }
  }
}