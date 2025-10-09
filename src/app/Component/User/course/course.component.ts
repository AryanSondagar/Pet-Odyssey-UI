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
  constructor(private route: ActivatedRoute, private courseService: AdminCourseService) { }
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
    console.log('Selected slot:', slot);
  }

}
