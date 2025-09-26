import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface SearchResponse {
  products: any[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private fakeStoreApi = 'https://fakestoreapi.com';
  private dummyJsonApi = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  // Authentication
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.fakeStoreApi}/auth/login`, credentials);
  }

  // Products from FakeStore API
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.fakeStoreApi}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.fakeStoreApi}/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.fakeStoreApi}/products/category/${category}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.fakeStoreApi}/products/categories`);
  }

  // Search products from DummyJSON API
  searchProducts(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.dummyJsonApi}/products/search?q=${query}`);
  }
}