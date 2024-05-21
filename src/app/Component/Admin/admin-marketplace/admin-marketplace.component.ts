import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

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

  users: User[] = [
    { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    
    // Add more users as needed for testing
  ];
  paginatedUsers!: User[];
  currentPage: number = 1;
  pageSize: number = 5;
  pages!: number[];

  
  ngOnInit(): void {
    this.setPage(1);
    this.pages = Array.from({ length: Math.ceil(this.users.length / this.pageSize) }, (_, i) => i + 1);
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pages.length) {
      this.setPage(page);
    }
  }



  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  imageUrls: string[] = [] ;
  productForm: MarketplaceForm[] =[];
  maxImg: number = 5;
  
  constructor(private builder: FormBuilder ) {}
 
  

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