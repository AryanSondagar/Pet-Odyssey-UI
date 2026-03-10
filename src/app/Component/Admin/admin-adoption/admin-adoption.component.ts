import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { AdoptionForm } from 'src/app/Model/adoption.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';
import { AlertService } from 'src/app/Services/alert.service';


@Component({
  selector: 'app-admin-adoption',
  templateUrl: './admin-adoption.component.html',
  styleUrls: ['./admin-adoption.component.scss'],

})
export class AdminAdoptionComponent implements OnInit {
  adoptionForm!: FormGroup

  selectedFiles: { file: File, preview: string }[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private adoptionService: AdminAdoptionService, private alert: AlertService ,  private fb: FormBuilder) {
  }

  ngOnInit(): void { 
     this.adoptionForm = this.fb.group({
      petName: ['', Validators.required],
      petCategory: ['', Validators.required],
      petBreed: ['', Validators.required],
      petAge: ['', [Validators.required, Validators.min(0)]],
      petsellingprice: ['', [Validators.required, Validators.min(0)]],
      owner_MobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }
  onFileSelected(event: any) {
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
  submitForm() {
    if (this.adoptionForm.invalid) return;

    const newProduct: AdoptionForm = {
      _id: '',
      petName: this.adoptionForm.get('petName')?.value,
      petCategory: this.adoptionForm.get('petCategory')?.value,
      petBreed: this.adoptionForm.get('petBreed')?.value,
      petAge: this.adoptionForm.get('petAge')?.value,
      petsellingprice: this.adoptionForm.get('petsellingprice')?.value,
      owner_MobileNumber: this.adoptionForm.get('owner_MobileNumber')?.value,
      petImages: this.selectedFiles.map(f => f.file)   // take only File objects
    };
    this.adoptionService.addAdoptionPet(newProduct).subscribe({
      next: (res) => {
        this.alert.ShowSuccess('Adoption Form Submitted Successfully!');
        this.adoptionForm.reset();
        this.selectedFiles = [];

        // Reset file input element
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong!');
      }
    });
  }

}

