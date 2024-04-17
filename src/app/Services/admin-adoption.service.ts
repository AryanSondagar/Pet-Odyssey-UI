import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionForm } from '../Model/adoption.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAdoptionService {
  apiUrl: string = "https://localhost:7153";
  constructor(private http:HttpClient) { }

  getAllAdoptionPet():Observable<AdoptionForm[]>{
    return this.http.get<AdoptionForm[]>("https://localhost:7153/api/AdoptionForm");
  }
}
