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
  adopt: AdoptionForm[] = [];
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
    this.courseService.getAllCourses().subscribe((data: Course[]) => {
      this.seminars = data;
    });
    this.ProductService.getAllProduct().subscribe((data: MarketplaceForm[]) => {
      this.Product = data;
    })
    this.adoptService.getAllAdoptionPet().subscribe((data: AdoptionForm[]) => {
      this.adopt = data;
      console.log(this.adopt);
    })
  }


  getImageUrl(img: any): string {
    // Prepend the host if your imageUrl is relative
    return 'http://localhost:5093' + img.imageUrl;
  }
  productDetail(Product: MarketplaceForm) {
    if (!Product.id) {
      console.error("Product ID is missing!");
      return;
    }

    this.ProductService.getProductById(Product.id).subscribe({
      next: (res) => {
        console.log("Product details:", res);
        // you can store it in a variable to display in template
        this.selectedProduct = res;
        this.route.navigate(['/product', res.id]);
      },
      error: (err) => {
        console.error("Error fetching product details:", err);
      }
    });
  }


  selectSeminar(seminar: Course) {
    if (!seminar.id) return;
    this.courseService.getCourseById(seminar.id).subscribe({
      next: (res: Course) => {
        this.selectedCourse = res;
        this.route.navigate(['/training', res.id]);
        console.log('Selected course:', res);
      },
      error: (err) => {
        console.error('Error fetching course by id:', err);
      }
    });
  }
  adoptPet(adopt: AdoptionForm){
    if (!adopt.id) return;
    this.adoptService.getAdoptionById(adopt.id).subscribe({
      next: (res: AdoptionForm) => {
        this.selectedPet = res;
        this.route.navigate(['/pet-detail', res.id]);
      },
      error: (err) => {
        console.error('Error fetching course by id:', err);
      }
    });
  }
}
