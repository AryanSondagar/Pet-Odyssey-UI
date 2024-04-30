import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginOptionComponent } from './login/userlogin/login-option/login-option.component';
import { Router } from '@angular/router';
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
  userName:string="";
  menutype: string= 'defult'

  ngOnInit():void{
    this.route.events.subscribe((val: any)=>{
       if (val.url) {
        if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.userName;
          this.menutype = 'user'
        }
        
       }else{
        this.menutype = 'defult';
       }
    })
  }
  constructor(private dialog: MatDialog , private route: Router){
  }
  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
  login(){
    this.dialog.open(LoginOptionComponent,{width: '270px' , minWidth:'150px'
    });
  }
}
