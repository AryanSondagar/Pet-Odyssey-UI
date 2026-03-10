import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { OpenDialogComponent } from '../../open-dialog/open-dialog.component';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';
import { AdminCourseService } from 'src/app/Services/admin-course.service';
import { Course } from 'src/app/Model/course.model';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';
import { AdoptionForm } from 'src/app/Model/adoption.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.scss',
    './../../../../assets/css/bootstrap.css',
    './../../../../assets/css/responsive.css',
    './../../../../assets/css/style.css',
    './../../../../assets/css/style.scss'
  ],

})
export class UserComponent {
  userName: string = "";
  menutype: string = 'defult';
  buttonClicked = false;
  adopt: any;
  Product: MarketplaceForm[] = [];
  seminars: Course[] = [];
  selectedCourse?: Course;
  selectedProduct?: MarketplaceForm;
  selectedPet?: AdoptionForm;

  constructor(private dialog: MatDialog,
    private route: Router,
    private userservice: UserService,
    private courseService: AdminCourseService,
    private adoptService: AdminAdoptionService,
    private ProductService: AdminMarketplaceService) {
    if (localStorage.getItem('user')) {
      this.menutype = 'user';
    } else {
      this.menutype = 'defult';
    }
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data: any) => {
      this.seminars = data.data;
      console.log(this.seminars);
    });
    this.ProductService.getAllProduct().subscribe((data: any) => {
      this.Product = data.products;
      console.log(this.Product);
    })
    this.adoptService.getAllAdoptionPet().subscribe((data: any) => {
      this.adopt = data.data;
      console.log(this.adopt);
    })
  }


  getImageUrl(img: any): string {
    return `http://localhost:3000/${img.replace(/\\/g, '/')}`;
  }
  productDetail(Product: MarketplaceForm) {
    if (!Product._id) {
      console.error("Product ID is missing!");
      return;
    }

    this.ProductService.getProductById(Product._id).subscribe({
      next: (res: any) => {
        console.log("Product details:", res);
        // you can store it in a variable to display in template
        this.selectedProduct = res.product;
        this.route.navigate(['/product', res.product._id]);
      },
      error: (err) => {
        console.error("Error fetching product details:", err);
      }
    });
  }


  selectSeminar(seminar: Course) {
    if (!seminar._id) return;
    this.courseService.getCourseById(seminar._id).subscribe({
      next: (res: any) => {
        this.selectedCourse = res.data;
        this.route.navigate(['/training', res._id]);
        console.log('Selected course:', res);
      },
      error: (err) => {
        console.error('Error fetching course by id:', err);
      }
    });
  }
  // adoptPet(adopt: AdoptionForm){
  //   if (!adopt._id) return;
  //   this.adoptService.getAdoptionById(adopt._id).subscribe({
  //     next: (res: AdoptionForm) => {
  //       this.selectedPet = res;
  //       this.route.navigate(['/pet-detail', res._id]);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching course by id:', err);
  //     }
  //   });
  // }
  adoptPet(pet: AdoptionForm) {
  this.route.navigate(['/pet-detail', pet._id]);
}
}
