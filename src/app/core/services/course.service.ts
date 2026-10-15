import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../../shared/models/course.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly apiUrl = `${environment.apiUrl}/api/courses`;
  private readonly selectedSlotSubject = new BehaviorSubject<string>('');
  readonly selectedSlot$ = this.selectedSlotSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<{ success: boolean; count: number; data: Course[] }> {
    return this.http.get<{ success: boolean; count: number; data: Course[] }>(this.apiUrl);
  }

  getCourseById(id: string): Observable<{ success: boolean; data: Course }> {
    return this.http.get<{ success: boolean; data: Course }>(`${this.apiUrl}/${id}`);
  }

  setSelectedSlot(slot: string): void {
    this.selectedSlotSubject.next(slot);
  }

  getSelectedSlot(): string {
    return this.selectedSlotSubject.getValue();
  }
}
