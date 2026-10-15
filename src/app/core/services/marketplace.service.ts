import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketplaceForm } from '../../shared/models/marketplace.model';
import { environment } from 'src/environments/environment';

interface ProductListResponse {
  success: boolean;
  count: number;
  products: MarketplaceForm[];
}

interface ProductDetailResponse {
  success: boolean;
  product: MarketplaceForm;
}

@Injectable({ providedIn: 'root' })
export class MarketplaceService {
  private readonly apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.apiUrl);
  }

  getProductById(id: string): Observable<ProductDetailResponse> {
    return this.http.get<ProductDetailResponse>(`${this.apiUrl}/${id}`);
  }
}
