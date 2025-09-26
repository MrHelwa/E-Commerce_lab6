import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, SearchResponse } from '../../services/api';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-products.html',
  styleUrls: ['./search-products.css']
})
export class SearchProducts {
  searchQuery: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;
  totalResults: number = 0;

  constructor(private apiService: ApiService) { }

  searchProducts() {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.hasSearched = true;

      this.apiService.searchProducts(this.searchQuery).subscribe({
        next: (response: SearchResponse) => {
          this.searchResults = response.products;
          this.totalResults = response.total;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.searchResults = [];
          this.totalResults = 0;
          this.isLoading = false;
        }
      });
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.hasSearched = false;
    this.totalResults = 0;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchProducts();
    }
  }
}