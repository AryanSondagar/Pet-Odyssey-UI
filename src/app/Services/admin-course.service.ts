import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../Model/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCourseService {
  apiUrl: string = "http://localhost:5903/api/CourseForm";
  constructor(private http: HttpClient) { }
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/GetAllCourse`);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/CreateCourse`, course);
  }
   deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteCourse/${id}`);
  }
}
