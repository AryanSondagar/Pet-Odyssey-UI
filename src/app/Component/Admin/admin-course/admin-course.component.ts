import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { CourseModel } from 'src/app/Model/course.model';
import { AdminCourseService } from 'src/app/Services/admin-course.service';


@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.scss']
})
export class AdminCourseComponent implements OnInit {
  newCourse: CourseModel = {
    CourseDate: new Date(),
    CourseTime:  '',
    CourseCity: '',
    CourseTrainer: ''
  };


  constructor(private formBuilder: FormBuilder,private courseService: AdminCourseService) { }

  ngOnInit(): void {
  }
  dataSubmit(data: any){
  console.log(data) ;
  this.courseService.addCourse(this.newCourse).subscribe((res)=>{
  })
  }

}
