import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Course } from '../Model/course.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminCourseService {
  apiUrl: string = `${environment.apiUrl}/api/admin/course`;
   private selectedSlotSubject = new BehaviorSubject<string>('');
  selectedSlot$ = this.selectedSlotSubject.asObservable();
  constructor(private http: HttpClient) { }
  getAllCourses(): Observable<{ success: boolean; count: number; data: Course[] }> {
    return this.http.get<{ success: boolean; count: number; data: Course[] }>(this.apiUrl);
  }

  getCourseById(id: string): Observable<{ success: boolean; data: Course }> {
    return this.http.get<{ success?: boolean; data?: Course; course?: Course } & Course>(`${this.apiUrl}/${id}`).pipe(
      map((res) => ({
        success: res.success ?? true,
        data: res.data ?? res.course ?? res,
      }))
    );
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
