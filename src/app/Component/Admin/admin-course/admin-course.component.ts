import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Course } from 'src/app/Model/course.model';
import { AdminCourseService } from 'src/app/Services/admin-course.service';
import { AlertService } from 'src/app/Services/alert.service';


@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.scss'],
})
export class AdminCourseComponent implements OnInit {
  courseForm: FormGroup;
  timeSlots: string[] = [];
  slots: string[] = [];
  maxSlots = 4;


  ngOnInit(): void {

  }
  constructor(private fb: FormBuilder , private courseService: AdminCourseService , private alertService: AlertService) {
    this.courseForm = this.fb.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      courseDate: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      TimeSlot: this.fb.group({
        hours: [1],
        minutes: [0],
        meridian: ['AM']
      })
    });
    this.lastHour = this.hours?.value ?? 12;

    this.hours?.valueChanges.subscribe(val => {
      if (val !== null) {
        // Going from 12 → 1 (forward wrap) → flip meridian
        if (this.lastHour === 12 && val === 1) {
          this.toggleMeridian();
        }
        // Going from 1 → 12 (backward wrap) → flip meridian
        else if (this.lastHour === 1 && val === 12) {
          this.toggleMeridian();
        }

        this.lastHour = val;
      }
    });
  }

  private lastHour = 12;

  get hours() {
    return this.courseForm.get('TimeSlot.hours');
  }
  get minutes() {
    return this.courseForm.get('TimeSlot.minutes');
  }
  get meridian() {
    return this.courseForm.get('TimeSlot.meridian');
  }

  get formattedHours(): string {
    return String(this.hours?.value ?? 0).padStart(2, '0');
  }

  toggleMeridian() {
    const current = this.meridian?.value as 'AM' | 'PM';
    this.meridian?.setValue(current === 'AM' ? 'PM' : 'AM');
  }
  addSlot() {
    if (this.slots.length >= this.maxSlots) return;

    const hours = this.hours?.value ?? 1;
    const minutes = this.minutes?.value ?? 0;
    const meridian = this.meridian?.value ?? 'AM';

    const formatted = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} ${meridian}`;

    // Avoid duplicate slots
    if (!this.slots.includes(formatted)) {
      this.slots.push(formatted);
    }
  }
  removeSlot(index: number) {
    this.slots.splice(index, 1);
  }


  onSubmit() {
    if (this.courseForm.valid && this.slots.length > 0) {
      const payload = {
        city: this.courseForm.value.city,
        state: this.courseForm.value.state,
        category: this.courseForm.value.category,
        price: this.courseForm.value.price,
        courseDate: this.courseForm.value.courseDate,
        TimeSlot: this.slots
      };
      console.log(payload);
      this.courseService.addCourse(payload).subscribe({
        next: res => {
          this.alertService.ShowSuccess('Course saved successfully!');
          // Reset form & slots
          this.courseForm.reset();
          this.slots = [];

          this.meridian?.setValue('AM');
          this.minutes?.setValue(0); 
          this.hours?.setValue(1);
        },
        error: err => console.error(err)
      });
    }
  }

}
