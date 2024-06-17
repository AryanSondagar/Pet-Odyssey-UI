import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginOptionComponent } from './login/userlogin/login-option/login-option.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { OpenDialogComponent } from '../../open-dialog/open-dialog.component';
import { faLock, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.scss',
    './css/bootstrap.css',
    './css/responsive.css',
    './css/style.css',
    './css/style.scss'
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

  ngOnInit(): void {

    this.ProductService.UserProduct().subscribe((res) => {
      this.AllProduct = res;
    })

    this.userservice.isUserLogined.subscribe(x => {
      if (x) {
        if (localStorage.getItem('user')) {
          this.menutype = 'user';


        } else {
          this.menutype = 'defult';
        }
      }
    });

    // this.route.events.subscribe((val: any) =>{
    //   if (val.url) {
    //     if (localStorage.getItem('user')) {
    //       this.menutype = 'user';
    //     }else{
    //       this.menutype = 'defult';
    //     }
    //   }
    // })
  }
  constructor(private dialog: MatDialog, 
    private route: Router, 
    private userservice: UserService, 
    private ProductService: AdminMarketplaceService) {
    if (localStorage.getItem('user')) {
      this.menutype = 'user';
    } else {
      this.menutype = 'defult';
    }
  }
  login() {
    this.dialog.open(LoginOptionComponent, {
      width: '270px', minWidth: '150px'
    });
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
