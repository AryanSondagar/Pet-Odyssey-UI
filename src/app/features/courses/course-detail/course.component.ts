import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@core/services/course.service';
import { UserService } from '@core/services/auth.service';
import { Course } from '@shared/models/course.model';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',

})
export class CourseComponent {
  course?: Course;
  showSlotError: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private routes: Router,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getCourseById(id).subscribe({
        next: (res) => {
          this.course = res?.data;
          console.log(this.course);
        },
        error: (err) => console.error('Error loading course:', err)
      });
    }
  }
  selectedSlot?: string;

  selectSlot(slot: string) {
    this.selectedSlot = slot;
    this.showSlotError = false;
    this.courseService.setSelectedSlot(slot);
    console.log('Selected slot:', slot);
  }
  buyCourse() {
    if (!this.selectedSlot) {
      this.showSlotError = true;
      return;
    }
    if (!this.userService.requireUserLogin('book course sessions')) {
      return;
    }
    this.routes.navigate(['/payment'], {
      queryParams: { type: 'course', id: this.course._id }
    });
  }
  GotoHome() {
    this.routes.navigate(['']);
  }

}
