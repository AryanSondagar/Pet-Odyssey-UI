import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/Model/course.model';
import { AdminCourseService } from 'src/app/Services/admin-course.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrl: './cours-list.component.scss'
})
export class CoursListComponent implements OnInit {

  displayedColumns: string[] = ['city', 'state', 'category', 'price', 'courseDate', 'actions'];
  dataSource!: MatTableDataSource<Course>;

  // Edit dialog
  showEditDialog = false;
  editForm!: FormGroup;
  selectedRow: any = null;
  editSlots: string[] = [];
  newSlotInput = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private courseService: AdminCourseService,
    private alert: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initEditForm();
    this.getAllCourses();
  }

  initEditForm(): void {
    this.editForm = this.fb.group({
      city:       ['', Validators.required],
      state:      ['', Validators.required],
      category:   ['', Validators.required],
      price:      [null, [Validators.required, Validators.min(0)]],
      courseDate: [null],
    });
  }

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.dataSource.filter = val.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  // ── Edit ─────────────────────────────────────────────
  openEditDialog(row: any): void {
    this.selectedRow = row;
    this.editSlots = row.timeSlots ? [...row.timeSlots] : [];
    this.newSlotInput = '';
    this.editForm.patchValue({
      city:       row.city,
      state:      row.state,
      category:   row.category,
      price:      row.price,
      courseDate: row.courseDate ? new Date(row.courseDate) : null,
    });
    this.showEditDialog = true;
  }

  closeDialog(): void {
    this.showEditDialog = false;
    this.selectedRow = null;
    this.editSlots = [];
    this.newSlotInput = '';
    this.editForm.reset();
  }

  addEditSlot(): void {
    const slot = this.newSlotInput.trim();
    if (slot && !this.editSlots.includes(slot)) {
      this.editSlots.push(slot);
    }
    this.newSlotInput = '';
  }

  removeEditSlot(index: number): void {
    this.editSlots.splice(index, 1);
  }

  onUpdate(): void {
    if (this.editForm.invalid || !this.selectedRow || this.editSlots.length === 0) return;

    const payload = {
      ...this.editForm.value,
      timeSlots: this.editSlots,
    };

    this.courseService.updateCourse(this.selectedRow._id, payload).subscribe({
      next: () => {
        this.alert.ShowSuccess('Course updated successfully!');
        const index = this.dataSource.data.findIndex(c => c._id === this.selectedRow._id);
        if (index !== -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = { ...this.selectedRow, ...payload };
          this.dataSource.data = updatedData;
        }
        this.closeDialog();
      },
      error: err => {
        console.error('Update failed:', err);
        this.alert.ShowError('Failed to update course!');
      }
    });
  }

  // ── Delete ───────────────────────────────────────────
  onDelete(row: any): void {
    this.courseService.deleteCourse(row._id).subscribe({
      next: () => {
        this.alert.ShowDelete('Pet Course Deleted Successfully!');
        this.dataSource.data = this.dataSource.data.filter(c => c._id !== row._id);
      },
      error: err => console.error('Delete failed:', err)
    });
  }
}