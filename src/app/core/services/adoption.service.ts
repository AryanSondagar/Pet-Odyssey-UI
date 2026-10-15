import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionForm } from '../../shared/models/adoption.model';
import { environment } from 'src/environments/environment';

interface AdoptionListResponse {
  success: boolean;
  count: number;
  data: AdoptionForm[];
}

interface AdoptionDetailResponse {
  success: boolean;
  data: AdoptionForm;
}

@Injectable({ providedIn: 'root' })
export class AdoptionService {
  private readonly apiUrl = `${environment.apiUrl}/api/pets`;

  constructor(private http: HttpClient) {}

  getAllAdoptionPet(): Observable<AdoptionListResponse> {
    return this.http.get<AdoptionListResponse>(this.apiUrl);
  }

  getAdoptionById(id: string): Observable<AdoptionDetailResponse> {
    return this.http.get<AdoptionDetailResponse>(`${this.apiUrl}/${id}`);
  }

  applyForAdoption(data: unknown): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/apply`, data);
  }
}
