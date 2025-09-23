import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { OpenDialogComponent } from '../../open-dialog/open-dialog.component';
import { faLock, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';
import { AdminCourseService } from 'src/app/Services/admin-course.service';
import { Course } from 'src/app/Model/course.model';

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

  fb = faFacebook;
  phone = faPhone;
  email = faEnvelope;
  AllProduct: any;
   seminars: Course[] = [];

  constructor(private dialog: MatDialog,
    private route: Router,
    private userservice: UserService,
    private courseService: AdminCourseService,
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
  
    this.userservice.isUserLogined.subscribe(x => {
    if (x) {
      if (localStorage.getItem('user')) {
        this.menutype = 'user';


      } else {
        this.menutype = 'defult';
      }
    }
  });
  }

login() {
  this.route.navigate(['UserLogin']);
}
openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(OpenDialogComponent, {
    width: '255px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
  this.userservice.buttonClicked$.subscribe((clicked) => {
    this.buttonClicked = clicked;
    if (this.buttonClicked == true) {
      this.menutype = 'defult'
    }
  });

}
course() {

  this.route.navigate(['/training'])
}
}
