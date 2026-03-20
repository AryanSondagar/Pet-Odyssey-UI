import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdoptionForm } from 'src/app/Model/adoption.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrl: './adoption-list.component.scss',
})
export class AdoptionListComponent implements OnInit {

  displayedColumns: string[] = ['petName', 'petCategory', 'petBreed', 'petAge', 'actions'];
  dataSource!: MatTableDataSource<AdoptionForm>;

  // Edit dialog state
  showEditDialog = false;
  editForm!: FormGroup;
  selectedRow: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adoptionService: AdminAdoptionService,
    private alert: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initEditForm();
    this.getAllAdoptionList();
  }

  initEditForm(): void {
    this.editForm = this.fb.group({
      petName:           ['', Validators.required],
      petBreed:          ['', Validators.required],
      petCategory:       ['', Validators.required],
      petAge:            ['', [Validators.required, Validators.min(0)]],
      petSellingPrice:   ['', [Validators.required, Validators.min(0)]],
      ownerMobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  getAllAdoptionList(): void {
    this.adoptionService.getAllAdoptionPet().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // ── Edit ──────────────────────────────────────────────
  openEditDialog(row: any): void {
    this.selectedRow = row;
    this.editForm.patchValue({
      petName:           row.petName,
      petBreed:          row.petBreed,
      petCategory:       row.petCategory,
      petAge:            row.petAge,
      petSellingPrice:   row.petSellingPrice,
      ownerMobileNumber: row.ownerMobileNumber,
    });
    this.showEditDialog = true;
  }

  closeDialog(): void {
    this.showEditDialog = false;
    this.selectedRow = null;
    this.editForm.reset();
  }

  onUpdate(): void {
    if (this.editForm.invalid || !this.selectedRow) return;

    const updated: AdoptionForm = {
      ...this.selectedRow,
      ...this.editForm.value,
    };

    this.adoptionService.updateAdoption(this.selectedRow._id, updated).subscribe({
      next: () => {
        this.alert.ShowSuccess('Pet updated successfully!');
        // Update row in table without re-fetching
        const index = this.dataSource.data.findIndex(p => p._id === this.selectedRow._id);
        if (index !== -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = updated;
          this.dataSource.data = updatedData;
        }
        this.closeDialog();
      },
      error: err => {
        console.error('Update failed:', err);
        this.alert.ShowError('Failed to update pet!');
      }
    });
  }

  // ── Delete ────────────────────────────────────────────
  onDelete(row: any): void {
    this.adoptionService.deleteAdoption(row._id).subscribe({
      next: () => {
        this.alert.ShowDelete('Pet Adoption Deleted Successfully!');
        this.dataSource.data = this.dataSource.data.filter(c => c._id !== row._id);
      },
      error: err => console.error('Delete failed:', err)
    });
  }
}