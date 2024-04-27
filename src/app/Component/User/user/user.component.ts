import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginOptionComponent } from './login/userlogin/login-option/login-option.component';
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
  constructor(private dialog: MatDialog){

  }
  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
  login(){
    this.dialog.open(LoginOptionComponent,{width: '270px' , minWidth:'150px'
    });
  }
}
