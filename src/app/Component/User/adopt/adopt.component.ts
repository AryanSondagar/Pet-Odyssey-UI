import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdoptionForm } from 'src/app/Model/adoption.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrl: './adopt.component.scss'
})
export class AdoptComponent {
  mainImage: any = '';
  adopt?: AdoptionForm;
  adoptionForm!: FormGroup;
  constructor(private adoptService: AdminAdoptionService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.adoptService.getAdoptionById(id).subscribe({
        next: (res) => {
          this.adopt = res;
          if (this.adopt?.petImages?.length > 0) {
            this.mainImage = this.getImageUrl(this.adopt.petImages[0]);
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
    return 'http://localhost:5093' + img.imageUrl;
  }
  onSubmit() {

  }
  changeImage(img: any) {
    this.mainImage = this.getImageUrl(img);
  }

}
