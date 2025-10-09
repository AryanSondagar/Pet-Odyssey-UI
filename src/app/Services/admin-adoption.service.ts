import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionForm } from '../Model/adoption.model';
import { Course } from '../Model/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAdoptionService {
  apiUrl: string = "http://localhost:5093/api/AdoptionForm";

  constructor(private http: HttpClient) { }

  getAllAdoptionPet(): Observable<AdoptionForm[]> {
    return this.http.get<AdoptionForm[]>(this.apiUrl + '/GetAllAdoptionForms');
  }
  getAdoptionById(id: string): Observable<AdoptionForm> {
     return this.http.get<AdoptionForm>(`${this.apiUrl}/${id}`);
  }
  addAdoptionPet(form: AdoptionForm): Observable<any> {
    const formData = new FormData();

    formData.append('PetName', form.petName);
    formData.append('PetCategory', form.petCategory);
    formData.append('PetBreed', form.petBreed);
    formData.append('PetAge', form.petAge.toString());
    formData.append('Petsellingprice', form.petsellingprice.toString());
    formData.append('Owner_MobileNumber', form.owner_MobileNumber);
    if (form.petImages && form.petImages.length > 0) {
      form.petImages.forEach(file => {
        formData.append('PetFiles', file, file.name);
      });
    }

    return this.http.post(this.apiUrl+'/addAdoptionForm' , formData);
  }
  deleteAdoption(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteAdoption/${id}`);
  }

}
