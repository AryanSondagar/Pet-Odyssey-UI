import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/Model/course.model';
import { AdminCourseService } from 'src/app/Services/admin-course.service';

@Component({
  selector: 'app-cours-list',
 
  templateUrl: './cours-list.component.html',
  styleUrl: './cours-list.component.scss'
})
export class CoursListComponent implements OnInit {
    course: Course[]=[];
    displayedColumns: string[] = ['courseDate', 'courseTime', 'courseCity','courseTrainer'];
  dataSource!: MatTableDataSource<Course>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
    constructor(private courseService:AdminCourseService){

    }
    ngOnInit(): void {
     this.courseService.getAllCourses().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort ;
      this.dataSource.paginator = this.paginator ;
     })
    }
    
    
}
