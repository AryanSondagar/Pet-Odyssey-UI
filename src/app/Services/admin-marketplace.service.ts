import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MarketplaceForm } from '../Model/marketplace.model';

@Injectable({
  providedIn: 'root'
})
export class AdminMarketplaceService {
  apiUrl: string = "http://localhost:5093";

  constructor(private http:HttpClient) { }

  getAllProduct():Observable<MarketplaceForm[]>{
    return this.http.get<MarketplaceForm[]>(this.apiUrl + '/api/MarketplaceForm');

  }
  addProduct(newProduct: MarketplaceForm):Observable<MarketplaceForm>{
    // newAdoption.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<MarketplaceForm>(this.apiUrl + '/api/MarketplaceForm', newProduct);
  }
  UserProduct(){
    return  this.http.get<MarketplaceForm[]>(this.apiUrl + '/api/MarketplaceForm');
  }
}
