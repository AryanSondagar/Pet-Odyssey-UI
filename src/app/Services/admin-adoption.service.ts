import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionForm } from '../Model/adoption.model';
import { Course } from '../Model/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAdoptionService {
  apiUrl: string = "http://localhost:3000/api/admin/adoption";

  constructor(private http: HttpClient) { }

  getAllAdoptionPet(): Observable<AdoptionForm[]> {
    return this.http.get<AdoptionForm[]>(this.apiUrl);
  }
  getAdoptionById(id: string): Observable<AdoptionForm> {
    return this.http.get<AdoptionForm>(`${this.apiUrl}/${id}`);
  }
  addAdoptionPet(form: AdoptionForm): Observable<any> {
    const formData = new FormData();

    formData.append('petName', form.petName);
    formData.append('petCategory', form.petCategory);
    formData.append('petBreed', form.petBreed);
    formData.append('petAge', form.petAge.toString());
    formData.append('petSellingPrice', form.petSellingPrice.toString());
    formData.append('ownerMobileNumber', form.ownerMobileNumber);
    if (form.petImages && form.petImages.length > 0) {
      form.petImages.forEach(file => {
        formData.append('petImages', file, file.name);
      });
    }

    return this.http.post(this.apiUrl, formData);
  }
  deleteAdoption(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  applyForAdoption(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, data);
  }
  updateAdoption(id: string, data: AdoptionForm): Observable<any> {
    const formData = new FormData();

    formData.append('petName', data.petName);
    formData.append('petCategory', data.petCategory);
    formData.append('petBreed', data.petBreed);
    formData.append('petAge', String(data.petAge));
    formData.append('petSellingPrice', String(data.petSellingPrice));
    formData.append('ownerMobileNumber', String(data.ownerMobileNumber));

    // Append new images only if provided
    if (data.petImages && data.petImages.length > 0) {
      data.petImages.forEach((file: File) => {
        formData.append('images', file, file.name);
      });
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

}
