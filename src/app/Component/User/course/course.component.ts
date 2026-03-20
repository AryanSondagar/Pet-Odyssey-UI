import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Model/course.model';
import { AdminCourseService } from 'src/app/Services/admin-course.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',

})
export class CourseComponent {
  course?: Course;
  showSlotError: boolean = false;
  constructor(private route: ActivatedRoute, private courseService: AdminCourseService, private routes: Router) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getCourseById(id).subscribe({
        next: (res) => {
          this.course = res;
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
    this.routes.navigate(['/payment'], {
      queryParams: { type: 'course', id: this.course._id }
    });
  }

}
