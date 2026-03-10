import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface User {
  name: string;
  email: string;
  phone: string;
}

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';
import { TooltipPosition } from '@angular/material/tooltip';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-admin-marketplace',
  templateUrl: './admin-marketplace.component.html',
  styleUrls: ['./admin-marketplace.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(300, style({ opacity: 0 }))),
    ]),
  ],
})

export class AdminMarketplaceComponent implements OnInit {
  
  marketplaceForm!: FormGroup;
  selectedFiles: { file: File, preview: string }[] = [];
  constructor(private builder: FormBuilder, private marketplaceService: AdminMarketplaceService,
    private fb: FormBuilder, private http: HttpClient , private alert: AlertService) {
    this.marketplaceForm = this.fb.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productPrice: [null, Validators.required],
      productStock: [null, Validators.required],
      productDescription: ['']
    });
  }
  ngOnInit(): void {

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
      images: this.selectedFiles.map(f => f.file)   // take only File objects
    };

    this.marketplaceService.addProduct(newProduct).subscribe({
      next: res => {
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




//https://media.istockphoto.com/id/1294440250/vector/seamless-gray-pattern-with-dog-paws-and-bones.jpg?s=612x612&w=0&k=20&c=nCTuqIEW5NHVvmsPuNShXRck0_EhzMskcnCY4qd70XI=