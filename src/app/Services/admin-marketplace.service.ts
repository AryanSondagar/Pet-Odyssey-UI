import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketplaceForm } from '../Model/marketplace.model';
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

@Injectable({
  providedIn: 'root'
})
export class AdminMarketplaceService {
  apiUrl: string = `${environment.apiUrl}/api/admin/marketplace`;

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.apiUrl);
  }
  addProduct(newProduct: MarketplaceForm): Observable<any> {
    // newAdoption.id = '00000000-0000-0000-0000-000000000000';
    // return this.http.post<MarketplaceForm>(this.apiUrl + '/api/MarketplaceForm', newProduct);
    const formData = new FormData();

    formData.append('productName', newProduct.productName);
    formData.append('productCategory', newProduct.productCategory);
    formData.append('productPrice', newProduct.productPrice.toString());
    formData.append('productStock', newProduct.productStock.toString());
    formData.append('productDescription', newProduct.productDescription);

    if (newProduct.images && newProduct.images.length > 0) {
      newProduct.images.forEach((file: File) => {
        formData.append('productImages', file); // must match backend property
      });
    }

    return this.http.post(this.apiUrl, formData);
  }
  UserProduct() {
    return this.http.get<MarketplaceForm[]>(this.apiUrl + '/api/MarketplaceForm');
  }
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getProductById(id: string): Observable<ProductDetailResponse> {
    return this.http.get<ProductDetailResponse>(`${this.apiUrl}/${id}`);
  }
  // admin-marketplace.service.ts
  updateProduct(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
