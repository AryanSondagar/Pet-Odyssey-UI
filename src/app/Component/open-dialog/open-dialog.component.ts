import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.scss']
})
export class OpenDialogComponent {
   isClicked: boolean= true ;
  constructor(private route:Router , private User: UserService){
  }
  LogOut(){
    localStorage.removeItem('user');
    this.route.navigate(['/'])
    this.User.clickButton(true) ;
  }

}
