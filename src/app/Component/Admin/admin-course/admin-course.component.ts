import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CourseModel } from 'src/app/Model/course.model';
import { AdminCourseService } from 'src/app/Services/admin-course.service';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatTimepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class AdminCourseComponent implements OnInit {
  courseForm: FormGroup;
  timeSlots: string[] = [];
  ngOnInit(): void {

  }
  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      courseDate: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      slotTime: ['']  // Temporary input for slot
    });
  }

  addTimeSlot() {
    const time = this.courseForm.get('slotTime')?.value;
    const ampm = this.courseForm.get('ampm')?.value;
    if (time && ampm) {
      const formatted = `${time} ${ampm}`;
      this.timeSlots.push(formatted);
      this.courseForm.patchValue({ slotTime: '', ampm: '' });
    }
  }

  removeTimeSlot(index: number) {
    this.timeSlots.splice(index, 1);
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formData = {
        ...this.courseForm.value,
        timeSlots: this.timeSlots
      };
      console.log('Form Data:', formData);
    }
  }
}
