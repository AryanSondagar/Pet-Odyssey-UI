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
      const role = localStorage.getItem('role');
        localStorage.removeItem('role');
    localStorage.removeItem('user');
     if (role === 'admin') {
    this.route.navigate(['/UserLogin']);  // redirect admin
  } else {
    this.route.navigate(['/']); // redirect user
  }
  this.User.clickButton(true);
  }

}
