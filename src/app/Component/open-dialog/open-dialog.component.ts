import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.scss']
})
export class OpenDialogComponent {
   isClicked: boolean= true ;
  constructor(private route:Router , private User: UserService, private alert: AlertService){
  }
  LogOut(){
    const role = this.User.getCurrentRole();
    this.User.logout().subscribe({
      next: () => {
        this.route.navigate(role === 'admin' ? ['/UserLogin'] : ['/']);
        this.User.clickButton(true);
      },
      error: (error) => {
        this.alert.ShowError('Logout failed. Please try again.');
        console.error('Logout error:', error);
      }
    });
  }

}
