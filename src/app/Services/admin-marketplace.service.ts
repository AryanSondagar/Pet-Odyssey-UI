import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MarketplaceForm } from '../Model/marketplace.model';

@Injectable({
  providedIn: 'root'
})
export class AdminMarketplaceService {
  apiUrl: string = "http://localhost:3000/api/admin/marketplace";

  constructor(private http:HttpClient) { }

  getAllProduct():Observable<MarketplaceForm[]>{
    return this.http.get<MarketplaceForm[]>(this.apiUrl);

  }
  addProduct(newProduct: MarketplaceForm):Observable<any>{
    // newAdoption.id = '00000000-0000-0000-0000-000000000000';
    // return this.http.post<MarketplaceForm>(this.apiUrl + '/api/MarketplaceForm', newProduct);
     const formData = new FormData();

  formData.append('productName', newProduct.productName);
  formData.append('productCategory', newProduct.productCategory);
  formData.append('productPrice', newProduct.productPrice.toString());
  formData.append('productStock', newProduct.productStock.toString());
  formData.append('productDescription', newProduct.productDescription);

  if (newProduct.productImages && newProduct.productImages.length > 0) {
    newProduct.productImages.forEach((file:File) => {
      formData.append('productImages', file); // must match backend property
    });
  }

  return this.http.post(this.apiUrl , formData);
  }
  UserProduct(){
    return  this.http.get<MarketplaceForm[]>(this.apiUrl + '/api/MarketplaceForm');
  }
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getProductById(id: string): Observable<MarketplaceForm> {
      return this.http.get<MarketplaceForm>(`${this.apiUrl}/${id}`);
    }
}
