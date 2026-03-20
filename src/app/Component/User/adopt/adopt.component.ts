import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptionForm } from 'src/app/Model/adoption.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrl: './adopt.component.scss'
})
export class AdoptComponent {
  mainImage: any = '';
  adopt?: AdoptionForm;
  adoptionForm!: FormGroup;
  constructor(private adoptService: AdminAdoptionService, private alert: AlertService, private route: ActivatedRoute, private routes: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.adoptService.getAdoptionById(id).subscribe({
        next: (res: any) => {
          this.adopt = res.data;
          if (this.adopt?.images && this.adopt.images.length > 0) {
            this.mainImage = this.getImageUrl(this.adopt.images[0]);
          }
          console.log(this.adopt);

        },
        error: (err) => console.error('Error loading adopt:', err)
      });
    }
    this.adoptionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      reason: ['', Validators.required],
      isAdult: [false, Validators.requiredTrue],
      hasPets: [false]
    });
  }
  getImageUrl(img: any): string {
    // Prepend the host if your imageUrl is relative
    return `http://localhost:3000/${img.replace(/\\/g, '/')}`;
  }
  onSubmit() {
    if (this.adoptionForm.invalid) return;

    const adoptionData = {
      petId: this.adopt?._id,
      petName: this.adopt?.petName,
      name: this.adoptionForm.value.name,
      email: this.adoptionForm.value.email,
      phone: this.adoptionForm.value.phone,
      address: this.adoptionForm.value.address,
      reason: this.adoptionForm.value.reason,
      isAdult: this.adoptionForm.value.isAdult,
      hasPets: this.adoptionForm.value.hasPets,
    };

    this.adoptService.applyForAdoption(adoptionData).subscribe({
      next: (res) => {
        this.alert.ShowSuccess('Adoption application submitted successfully!');
        this.adoptionForm.reset();
      },
      error: (err) => {
        this.alert.ShowError('Something went wrong. Please try again.');
        console.error(err);
      }
    });
  }
  changeImage(img: any) {
    this.mainImage = this.getImageUrl(img);
  }
  GotoHome() {
    this.routes.navigate(['']);
  }

}
