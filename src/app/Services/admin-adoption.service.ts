import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionForm } from '../Model/adoption.model';
import { CourseModel } from '../Model/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAdoptionService {
  apiUrl: string = "https://localhost:7159";

  constructor(private http:HttpClient) { }

  getAllAdoptionPet():Observable<AdoptionForm[]>{
    return this.http.get<AdoptionForm[]>(this.apiUrl + '/api/adoption');
  }
  addAdoptionPet(newAdoption: AdoptionForm):Observable<AdoptionForm>{
    // newAdoption.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<AdoptionForm>(this.apiUrl + '/api/adoption', newAdoption) ;
  }
  

}
