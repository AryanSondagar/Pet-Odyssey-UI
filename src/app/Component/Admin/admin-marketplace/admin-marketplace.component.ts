import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';

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
  productForm: MarketplaceForm[] =[];
  
  constructor(private builder: FormBuilder ) {}
  ngOnInit(): void {
  }

  submit(data: any) {
    console.log(data);
    console.log('Submitted files:', this.imageUrls);
  }
  
  ImageCount(input : any){
    if(input.files.length >5){
      alert("You can only upload a maximum of 5 Images.")
    }
  }

  handleFileInput(event: any): void {
    this.imageUrls = event.target.files;
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
  clear(){

  }
}


//https://media.istockphoto.com/id/1294440250/vector/seamless-gray-pattern-with-dog-paws-and-bones.jpg?s=612x612&w=0&k=20&c=nCTuqIEW5NHVvmsPuNShXRck0_EhzMskcnCY4qd70XI=