import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { trigger, state, style, animate, transition } from '@angular/animations';

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
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  

  constructor(private builder: FormBuilder) {}
  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  submit(data:object){
    console.log(data);
  }
  imageUrls: string[] = [];

  handleFileInput(event: any): void {
    const files = event.target.files;
    if (files) {
      this.imageUrls = []; 
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrls.push(reader.result as string);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  
}
