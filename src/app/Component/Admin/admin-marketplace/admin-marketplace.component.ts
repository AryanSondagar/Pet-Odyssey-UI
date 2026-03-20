import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-admin-marketplace',
  templateUrl: './admin-marketplace.component.html',
  styleUrls: ['./admin-marketplace.component.scss']
})
export class AdminMarketplaceComponent implements OnInit {

  marketplaceForm!: FormGroup;
  selectedFiles: { file: File, preview: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private marketplaceService: AdminMarketplaceService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.marketplaceForm = this.fb.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productPrice: [null, Validators.required],
      productStock: [null, Validators.required],
      productDescription: ['']
    });
  }

  onFileChange(event: any) {
    if (event.target.files) {
      const files = Array.from(event.target.files as FileList).slice(0, 5);
      this.selectedFiles = [];
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({ file, preview: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.marketplaceForm.invalid) return;

    const newProduct: MarketplaceForm = {
      _id: '',
      productName: this.marketplaceForm.get('productName')?.value,
      productCategory: this.marketplaceForm.get('productCategory')?.value,
      productPrice: this.marketplaceForm.get('productPrice')?.value,
      productStock: this.marketplaceForm.get('productStock')?.value,
      productDescription: this.marketplaceForm.get('productDescription')?.value,
      images: this.selectedFiles.map(f => f.file)
    };

    this.marketplaceService.addProduct(newProduct).subscribe({
      next: () => {
        this.alert.ShowSuccess('Product added successfully!');
        this.marketplaceForm.reset();
        this.selectedFiles = [];
      },
      error: err => {
        console.error(err);
        alert('Error while adding product!');
      }
    });
  }
}