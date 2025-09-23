import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';



import { AdoptionForm } from 'src/app/Model/adoption.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';
import { AlertService } from 'src/app/Services/alert.service';


@Component({
  selector: 'app-admin-adoption',
  templateUrl: './admin-adoption.component.html',
  styleUrls: ['./admin-adoption.component.scss'],

})
export class AdminAdoptionComponent implements OnInit {
  adoptionForm: AdoptionForm = {
    petName: '',
    petCategory: '',
    petBreed: '',
    petAge: 0,
    petSellingPrice: 0,
    owner_MobileNumber: '',
    petFiles: []
  };
  selectedFiles: { file: File, preview: string }[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private adoptionService: AdminAdoptionService , private alert: AlertService) {
  }

  ngOnInit(): void { }
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
    this.adoptionService.addAdoptionPet(this.adoptionForm).subscribe({
      next: (res) => {
        this.alert.ShowSuccess('Adoption Form Submitted Successfully!');
        this.adoptionForm = {
          petName: '',
          petCategory: '',
          petBreed: '',
          petAge: 0,
          petSellingPrice: 0,
          owner_MobileNumber: '',
          petFiles: []
        };
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

