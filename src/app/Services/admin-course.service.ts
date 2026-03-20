import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../Model/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCourseService {
  apiUrl: string = "http://localhost:3000/api/admin/course";
   private selectedSlotSubject = new BehaviorSubject<string>('');
  selectedSlot$ = this.selectedSlotSubject.asObservable();
  constructor(private http: HttpClient) { }
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }
   deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  setSelectedSlot(slot: string): void {
    this.selectedSlotSubject.next(slot);
  }

  getSelectedSlot(): string {
    return this.selectedSlotSubject.getValue();
  }
  updateCourse(id: string, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, data);
}
}
