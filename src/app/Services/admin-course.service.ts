import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../Model/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCourseService {
  apiUrl: string = "http://localhost:5903";
  constructor(private http: HttpClient) { }
  
  getAllCourse():Observable<CourseModel[]>{
    return this.http.get<CourseModel[]>(this.apiUrl + '/api/course');
  }
  addCourse(newCourse: CourseModel):Observable<CourseModel>{
    // newAdoption.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<CourseModel>(this.apiUrl + '/api/course', newCourse) ;
  }
}
