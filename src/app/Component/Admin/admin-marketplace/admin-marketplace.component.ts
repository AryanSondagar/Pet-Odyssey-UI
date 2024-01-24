import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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
  imageUrls: string[] = [] ;
  constructor(private builder: FormBuilder) {}
  ngOnInit(): void {}

  submit(data: object) {
    console.log(data);
  }


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


//https://media.istockphoto.com/id/1294440250/vector/seamless-gray-pattern-with-dog-paws-and-bones.jpg?s=612x612&w=0&k=20&c=nCTuqIEW5NHVvmsPuNShXRck0_EhzMskcnCY4qd70XI=