import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, AfterViewInit {

  readonly BASE_URL = 'http://localhost:3000';

  displayedColumns: string[] = ['productName', 'productCategory', 'productPrice', 'productStock', 'actions'];
  dataSource = new MatTableDataSource<MarketplaceForm>();

  // Edit dialog
  showEditDialog = false;
  editForm!: FormGroup;
  selectedRow: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: AdminMarketplaceService,
    private alert: AlertService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initEditForm();
    this.productService.getAllProduct().subscribe((res: any) => {
      this.dataSource.data = res.products;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initEditForm(): void {
    this.editForm = this.fb.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productPrice: [null, [Validators.required, Validators.min(0)]],
      productStock: [null, [Validators.required, Validators.min(0)]],
      productDescription: [''],
    });
  }

  applyFilter(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.dataSource.filter = val.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  getImageUrl(path: string): string {
    return `${this.BASE_URL}/${path.replace(/\\/g, '/')}`;
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/image/placeholder.png';
  }

  // ── Edit ─────────────────────────────────────────────
  openEditDialog(row: any): void {
    this.selectedRow = row;
    this.editForm.patchValue({
      productName: row.productName,
      productCategory: row.productCategory,
      productPrice: row.productPrice,
      productStock: row.productStock,
      productDescription: row.productDescription,
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

    const payload = {
      productName: this.editForm.value.productName,
      productCategory: this.editForm.value.productCategory,
      productPrice: this.editForm.value.productPrice,
      productStock: this.editForm.value.productStock,
      productDescription: this.editForm.value.productDescription ?? '',
    };

    this.productService.updateProduct(this.selectedRow._id, payload).subscribe({
      next: () => {
        this.alert.ShowSuccess('Product updated successfully!');
        const index = this.dataSource.data.findIndex(p => p._id === this.selectedRow._id);
        if (index !== -1) {
          const updated = [...this.dataSource.data];
          updated[index] = { ...this.selectedRow, ...this.editForm.value };
          this.dataSource.data = updated;
        }
        this.closeDialog();
      },
      error: err => {
        console.error('Update failed:', err);
        this.alert.ShowError('Failed to update product!');
      }
    });
  }

  // ── Delete ───────────────────────────────────────────
  onDelete(row: any): void {
    this.productService.deleteProduct(row._id).subscribe({
      next: () => {
        this.alert.ShowDelete('Product Deleted Successfully!');
        this.dataSource.data = this.dataSource.data.filter(c => c._id !== row._id);
      },
      error: err => console.error('Delete failed:', err)
    });
  }
}